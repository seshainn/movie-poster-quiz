'use client'
import { trpc } from '@/app/_trpc/client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Movie = {
  id: string
  url: string
  randomNumber: number
  rightans: string
  wrong1: string
  wrong2: string
  wrong3: string
  chosen: string
}

const Page = () => {
  const [movieQuestions, setMovieQuestions] = useState<Movie[]>([])
  const [movieIndex, setMovieIndex] = useState(0)

  const handleNext = () => {
    if (movieIndex < movieQuestions.length - 1) {
      setMovieIndex((prev) => prev + 1)
    }
  }

  const { refetch } = trpc.moviesForNewgame.useQuery(undefined, {
    enabled: false,
    onSuccess: (movies: Movie[]) => {
      console.log(movies)
      setMovieQuestions((prevArray) => [...prevArray, ...movies])
    },
  })
  useEffect(() => {
    const fetchData = async () => {
      await refetch()
    }

    fetchData()
  }, [refetch])

  return (
    <>
      <div className='absolute -z-20 dark:bg-dark-100 w-full h-full'></div>
      <Image
        src={
          movieQuestions[movieIndex]
            ? movieQuestions[movieIndex].url
            : '/collage.jpg'
        }
        alt='collage'
        fill
        style={{ objectFit: 'cover' }}
        className='opacity-30 -z-10'
      />
      {movieQuestions[movieIndex] && (
        <div className='flex max-md:flex-col flex-center py-24 px-12 space-y-6'>
          <div className='w-full md:w-3/5 h-full flex-center max-w-[740px] max-h-[400px] rounded-xl shadow-xl overflow-hidden backdrop-blur relative'>
            <Image
              src={movieQuestions[movieIndex].url}
              alt='collage'
              width={0}
              height={0}
              sizes='100vw'
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div className='w-full md:w-2/5 p-4 flex flex-center flex-col space-y-4'>
            <div className='space-x-2 text-lg'>
              <input
                type='radio'
                value='abcdef'
                className='w-4 h-4 form-radio checked:bg-teal-500'
              />
              <span className='text-black dark:text-teal-500'>
                Brokeback Mountain
              </span>
            </div>
            <div className='space-x-2 text-lg'>
              <input
                type='radio'
                value='abcdef'
                className='w-4 h-4 form-radio checked:bg-teal-500'
              />
              <span className='text-black dark:text-teal-500'>
                The Hills Have Eyes
              </span>
            </div>
            <div className='space-x-2 text-lg'>
              <input
                type='radio'
                value='abcdef'
                className='w-4 h-4 form-radio checked:bg-teal-500'
              />
              <span className='text-black dark:text-teal-500'>
                Seeking a friend for the end of the world
              </span>
            </div>
            <div className='space-x-2 text-lg'>
              <input
                type='radio'
                value='abcdef'
                className='w-4 h-4 form-radio checked:bg-teal-500'
              />
              <span className='text-black dark:text-teal-500'>
                I Know What You Did Last Summer
              </span>
            </div>
            <br />
            <button
              type='submit'
              className='btn bg-color text-hover px-6 py-2 rounded-md tracking-widest text-black font-semibold hover:text-darkTeal dark:hover:text-darkTeal'
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  )
}
export default Page
