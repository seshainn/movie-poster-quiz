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
  const [answers, setAnswers] = useState<string[]>([])

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

  useEffect(() => {
    if (movieQuestions[movieIndex]) {
      var choices = [
        movieQuestions[movieIndex].rightans,
        movieQuestions[movieIndex].wrong1,
        movieQuestions[movieIndex].wrong2,
        movieQuestions[movieIndex].wrong3,
      ]

      //Fisher Yates shuffle algorithm
      for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[choices[i], choices[j]] = [choices[j], choices[i]]
      }
      setAnswers(choices)
    }
  }, [movieQuestions, movieIndex])

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
                value={answers[0]}
                className='w-4 h-4 form-radio checked:bg-teal-500'
              />
              <span className='text-black dark:text-teal-500'>
                {answers[0]}
              </span>
            </div>
            <div className='space-x-2 text-lg'>
              <input
                type='radio'
                value={answers[1]}
                className='w-4 h-4 form-radio checked:bg-teal-500'
              />
              <span className='text-black dark:text-teal-500'>
                {answers[1]}
              </span>
            </div>
            <div className='space-x-2 text-lg'>
              <input
                type='radio'
                value={answers[2]}
                className='w-4 h-4 form-radio checked:bg-teal-500'
              />
              <span className='text-black dark:text-teal-500'>
                {answers[2]}
              </span>
            </div>
            <div className='space-x-2 text-lg'>
              <input
                type='radio'
                value={answers[3]}
                className='w-4 h-4 form-radio checked:bg-teal-500'
              />
              <span className='text-black dark:text-teal-500'>
                {answers[3]}
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
