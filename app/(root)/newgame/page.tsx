'use client'
import { trpc } from '@/app/_trpc/client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

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
  const [movieQuestionsUpdt, setMovieQuestionsUpdt] = useState<Movie[]>([])
  const [movieIndex, setMovieIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selection, setSelection] = useState('')
  const [playAgain, setPlayAgain] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  const handleNext = () => {
    if (movieIndex < movieQuestions.length) {
      setMovieIndex((prev) => prev + 1)
    }
  }

  const { refetch, isLoading } = trpc.moviesForNewgame.useQuery(undefined, {
    enabled: false,
    onSuccess: (movies: Movie[]) => {
      setMovieQuestions((prevArray) => [...prevArray, ...movies])
      setMovieQuestionsUpdt((prevArray) => [...prevArray, ...movies])
    },
  })
  useEffect(() => {
    const fetchData = async () => {
      await refetch()
    }

    fetchData()
  }, [refetch, playAgain])

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

  const handleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelection(e.target.value)
    const updatedMovies = [...movieQuestionsUpdt]
    updatedMovies[movieIndex] = {
      ...updatedMovies[movieIndex],
      chosen: e.target.value,
    }
    setMovieQuestionsUpdt(updatedMovies)
  }

  const handleSubmit = () => {
    console.log(movieQuestionsUpdt)
    setQuizScore(
      movieQuestionsUpdt.filter((movie) => {
        return movie.chosen === movie.rightans
      }).length
    )
    setMovieQuestions([])
    setMovieQuestionsUpdt([])
    setMovieIndex(0)
  }

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
      {movieQuestions[movieIndex] ? (
        <div className='flex max-md:flex-col flex-center px-12 space-y-6'>
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
                checked={selection === answers[0]}
                onChange={handleSelection}
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
                checked={selection === answers[1]}
                onChange={handleSelection}
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
                checked={selection === answers[2]}
                onChange={handleSelection}
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
                checked={selection === answers[3]}
                onChange={handleSelection}
                className='w-4 h-4 form-radio checked:bg-teal-500'
              />
              <span className='text-black dark:text-teal-500'>
                {answers[3]}
              </span>
            </div>
            <br />
            {movieIndex === 9 ? (
              <button
                type='submit'
                className='btn bg-color text-hover px-6 py-2 rounded-md tracking-widest text-black font-semibold hover:text-darkTeal dark:hover:text-darkTeal'
                onClick={handleSubmit}
              >
                Submit
              </button>
            ) : (
              <button
                type='submit'
                className='btn bg-color text-hover px-6 py-2 rounded-md tracking-widest text-black font-semibold hover:text-darkTeal dark:hover:text-darkTeal'
                onClick={handleNext}
              >
                next
              </button>
            )}
          </div>
        </div>
      ) : (
        !isLoading && (
          <div className='flex flex-col flex-center px-12 space-y-10'>
            <h1 className='text-black dark:text-white font-bold text-2xl'>
              Your score is {quizScore}/10
            </h1>
            <button
              type='submit'
              className='btn bg-color text-hover px-6 py-2 rounded-md tracking-widest text-black text-lg font-semibold hover:text-darkTeal dark:hover:text-darkTeal'
              onClick={() => {
                setPlayAgain(!playAgain)
              }}
            >
              Play again
            </button>
          </div>
        )
      )}
    </>
  )
}
export default Page
