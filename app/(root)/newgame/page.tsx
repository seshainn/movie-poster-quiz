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
    <div>
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
        <div className='flex flex-center flex-col px-10 h-screen w-full space-y-3'>
          <h1 className='text-white'>Choose the right option</h1>
          <div className='w-full h-full max-w-[555px] max-h-[300px] rounded-xl shadow-xl overflow-hidden backdrop-blur relative'>
            <Image
              src={movieQuestions[movieIndex].url}
              alt='collage'
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className='w-full p-4 flex flex-col flex-center'>
            <div className='w-full flex flex-between'>
              <div className='w-1/2 flex flex-center space-x-2'>
                <input type='radio' value='abcdef' />
                <span>abcdef</span>
              </div>
              <div className='w-1/2 flex flex-center space-x-2'>
                <input type='radio' value='ghijkl' />
                <span>ghijkl</span>
              </div>
            </div>
            <div className='w-full flex flex-between'>
              <div className='w-1/2 flex flex-center space-x-2'>
                <input type='radio' value='abcdef' />
                <span>abcdef</span>
              </div>
              <div className='w-1/2 flex flex-center space-x-2'>
                <input type='radio' value='ghijkl' />
                <span>ghijkl</span>
              </div>
            </div>
          </div>
          <button
            type='submit'
            className='border border-black px-4 py-2 bg-blue-400 rounded-md'
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
export default Page
