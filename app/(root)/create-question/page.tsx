'use client'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FileEdit } from 'lucide-react'
import { trpc } from '@/app/_trpc/client'

const movieSchema = z.object({
  right: z.string().min(1),
  wrong1: z.string().min(1),
  wrong2: z.string().min(1),
  wrong3: z.string().min(1),
  uploadedFile: z.custom(
    (value) => {
      return value instanceof File
    },
    {
      message: 'Did you forget something???',
    }
  ),
})

const Page = () => {
  const [fileSelected, setFileSelected] = useState('')

  const { register, handleSubmit, formState, reset, setError, setValue } =
    useForm<z.infer<typeof movieSchema>>({
      resolver: zodResolver(movieSchema),
      defaultValues: {
        right: '',
        wrong1: '',
        wrong2: '',
        wrong3: '',
        uploadedFile: undefined,
      },
    })

  const { errors } = formState

  const { mutate } = trpc.uploadImage.useMutation()

  const submitForm = async (data: z.infer<typeof movieSchema>) => {
    console.log(data.uploadedFile)
    const formData = new FormData()
    formData.append('file', data.uploadedFile)
    formData.append('upload_preset', 'qgarwh58') //unsigned upload preset at cloudinary
    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/' +
          process.env.NEXT_PUBLIC_CLOUDINARY_NAME +
          '/image/upload',

        {
          method: 'POST',
          body: formData,
        }
      )
      const resdata = await response.json()
      console.log(resdata.public_id, resdata.secure_url)
    } catch (error) {
      console.log('error occurred during cloudinary upload: ', error)
    }
    //mutate(formData)
    reset()
    setValue('uploadedFile', null)
    setFileSelected('')
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles[0]) {
        reset({ uploadedFile: acceptedFiles[0] })
        setFileSelected(acceptedFiles[0].name)
      } else {
        setError('uploadedFile', {
          type: 'custom',
          message: 'Only jpeg/jpg/png accepted',
        })
      }
    },
  })

  return (
    <>
      <div className='absolute -z-20 dark:bg-dark-100 w-full h-full'></div>
      <Image
        src='/collage.jpg'
        alt='collage'
        fill
        style={{ objectFit: 'cover' }}
        className='opacity-30 -z-10'
      />
      <div className='flex flex-col flex-center p-24 space-y-6'>
        <h1 className='text-xl font-bold backdrop-blur-xs text-color'>
          Enter movie details
        </h1>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className='flex flex-col flex-center space-y-3 w-screen px-20'>
            <input
              type='text'
              autoComplete='off'
              placeholder='Enter movie name'
              {...register('right')}
              className='w-full max-w-md bg-orange-400 bg-opacity-60 dark:bg-teal-100 p-2 rounded-lg text-center placeholder:text-lg placeholder:text-gray-500 text-black font-semibold text-lg'
            />
            <p className='text-red-500 text-sm'>{errors.right?.message}</p>
            <input
              type='text'
              autoComplete='off'
              placeholder='Enter wrong answer 1'
              {...register('wrong1')}
              className='w-full max-w-md bg-orange-400 bg-opacity-60 dark:bg-teal-100 p-2 rounded-lg text-center placeholder:text-lg placeholder:text-gray-500 text-black text-lg'
            />
            <p className='text-red-500 text-sm'>{errors.wrong1?.message}</p>
            <input
              type='text'
              autoComplete='off'
              placeholder='Enter wrong answer 2'
              {...register('wrong2')}
              className='w-full max-w-md bg-orange-400 bg-opacity-60 dark:bg-teal-100 p-2 rounded-lg text-center placeholder:text-lg placeholder:text-gray-500 text-black text-lg'
            />
            <p className='text-red-500 text-sm'>{errors.wrong2?.message}</p>
            <input
              type='text'
              autoComplete='off'
              placeholder='Enter wrong answer 3'
              {...register('wrong3')}
              className='w-full max-w-md bg-orange-400 bg-opacity-60 dark:bg-teal-100 p-2 rounded-lg text-center placeholder:text-lg placeholder:text-gray-500 text-black text-lg'
            />
            <p className='text-red-500 text-sm'>{errors.wrong3?.message}</p>
            <div className='w-full max-w-md bg-orange-400 bg-opacity-60 dark:bg-teal-100 text-center text-md p-2 text-gray-500'>
              <div
                {...getRootProps()}
                className='p-6 border border-dashed border-black w-full cursor-pointer'
              >
                <input
                  {...getInputProps()}
                  {...register('uploadedFile')}
                  className='w-full bg-transparent text-center placeholder:text-gray-600 cursor-pointer focus:outline-none'
                />
                {errors.uploadedFile && !fileSelected && (
                  <p className='text-red-500'>
                    {errors.uploadedFile.message?.toString()}
                  </p>
                )}
                {fileSelected ? (
                  <div className='flex flex-between'>
                    {fileSelected}
                    <FileEdit />
                  </div>
                ) : (
                  <p>Upload Image Here</p>
                )}
              </div>
            </div>
            <button
              type='submit'
              className='w-full max-w-md bg-darkOrange dark:bg-lightTeal text-black font-semibold text-xl tracking-wider p-2 rounded-lg btn-hover'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Page
