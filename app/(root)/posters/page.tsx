'use client'
import { CldUploadButton } from 'next-cloudinary'
import { CldImage } from 'next-cloudinary'

const page = () => {
  return (
    <div className='flex flex-col justify-center items-centers'>
      <CldUploadButton
        onUpload={(result) => {
          if (result.event === 'success') {
            if (typeof result.info === 'object' && 'public_id' in result.info) {
              console.log(result.info.public_id)
            }
          }
        }}
        uploadPreset='qgarwh58'
      />
      <CldImage
        width='1000'
        height='600'
        src='MoviePosters/j7dmaeq06qfz8sue9vpl'
        sizes='100vw'
        alt='poster1'
      />
    </div>
  )
}

export default page
