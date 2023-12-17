'use client'
import { trpc } from '@/app/_trpc/client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Results from '@/app/_components/Results'

type Movie = {
  id: string
  url: string
  blururl: string
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
    handleSelection()
    if (movieIndex < movieQuestions.length) {
      setMovieIndex((prev) => prev + 1)
    }
  }

  const { refetch, isLoading, isFetching } = trpc.moviesForNewgame.useQuery(
    undefined,
    {
      enabled: false,
      onSuccess: (movies: Movie[]) => {
        setMovieQuestions(movies)
        setMovieQuestionsUpdt(movies)
      },
    }
  )

  const { mutate } = trpc.updateUser.useMutation()

  useEffect(() => {
    const fetchData = async () => {
      await refetch()
    }

    fetchData()
  }, [refetch, playAgain])

  const handlePlayAgain = () => {
    setPlayAgain(!playAgain)
    setMovieIndex(0)
  }
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

  const handleSelection = () => {
    const updatedMovies = [...movieQuestionsUpdt]
    updatedMovies[movieIndex] = {
      ...updatedMovies[movieIndex],
      chosen: selection,
    }
    setMovieQuestionsUpdt(updatedMovies)
    setSelection('')
  }

  const handleSubmit = () => {
    handleNext()
    let score = movieQuestionsUpdt.filter((movie) => {
      return movie.chosen === movie.rightans
    }).length
    if (
      movieQuestionsUpdt[movieQuestionsUpdt.length - 1].rightans === selection
    ) {
      score += 1
    }
    setQuizScore(score)
    mutate({
      score,
    })
  }

  return (
    <>
      <div className='absolute -z-20 dark:bg-dark-100 w-full h-full'></div>
      <Image
        src={
          !isLoading && !isFetching && movieQuestions[movieIndex]
            ? movieQuestions[movieIndex].url
            : '/collage.jpg'
        }
        alt='collage'
        fill
        style={{ objectFit: 'cover' }}
        className='opacity-40 dark:opacity-30 -z-10'
      />

      {movieQuestions[movieIndex]
        ? !isLoading &&
          !isFetching && (
            <div className='flex max-md:flex-col flex-center px-12 space-y-6 mt-14'>
              <div className='w-full md:w-3/5 h-full flex-center rounded-xl shadow-xl overflow-hidden backdrop-blur relative'>
                <Image
                  src={movieQuestions[movieIndex].url}
                  alt='collage'
                  width={0}
                  height={0}
                  placeholder='blur'
                  blurDataURL={movieQuestions[movieIndex].blururl}
                  sizes='100vw'
                  style={{ width: '100%', height: '100%' }}
                  className='rounded-xl shadow-xl backdrop-blur'
                />
                <div className='absolute top-2 right-2'>
                  <div className='bg-orange-500 dark:bg-teal-500 text-white rounded-full w-12 h-12 flex items-center justify-center relative'>
                    <span className='text-black p-2'>{movieIndex + 1}/10</span>
                    <div className='absolute inset-0 rounded-full border-4 border-transparent'></div>
                    <div className='absolute inset-0 rounded-full border-4 border-orange-400 dark:border-teal-400 transform -rotate-45 z-10'></div>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-2/5 p-4 flex justify-start flex-col space-y-4 pl-10'>
                <div className='flex flex-start items-center space-x-2'>
                  <div className='flex flex-center hover:scale-150 transition-transform duration-200  cursor-pointer rounded-full bg-white border border-gray-400'>
                    <input
                      readOnly
                      className={`w-3 h-3 m-1 rounded-full focus:outline-none cursor-pointer ${
                        selection === answers[0]
                          ? 'bg-orange-500 dark:bg-teal-500'
                          : ''
                      }`}
                      onClick={() => {
                        setSelection(answers[0])
                      }}
                    />
                  </div>
                  <span className='text-black dark:text-teal-500'>
                    {answers[0]}
                  </span>
                </div>
                <div className='flex flex-start items-center space-x-2'>
                  <div className='flex flex-center hover:scale-150 transition-transform duration-200  cursor-pointer rounded-full bg-white border border-gray-400'>
                    <input
                      readOnly
                      className={`w-3 h-3 m-1 rounded-full focus:outline-none cursor-pointer ${
                        selection === answers[1]
                          ? 'bg-orange-500 dark:bg-teal-500'
                          : ''
                      }`}
                      onClick={() => {
                        setSelection(answers[1])
                      }}
                    />
                  </div>
                  <span className='text-black dark:text-teal-500'>
                    {answers[1]}
                  </span>
                </div>
                <div className='flex flex-start items-center space-x-2'>
                  <div className='flex flex-center hover:scale-150 transition-transform duration-200  cursor-pointer rounded-full bg-white border border-gray-400'>
                    <input
                      readOnly
                      className={`w-3 h-3 m-1 rounded-full focus:outline-none cursor-pointer ${
                        selection === answers[2]
                          ? 'bg-orange-500 dark:bg-teal-500'
                          : ''
                      }`}
                      onClick={() => {
                        setSelection(answers[2])
                      }}
                    />
                  </div>
                  <span className='text-black dark:text-teal-500'>
                    {answers[2]}
                  </span>
                </div>
                <div className='flex flex-start items-center space-x-2'>
                  <div className='flex flex-center hover:scale-150 transition-transform duration-200  cursor-pointer rounded-full bg-white border border-gray-400'>
                    <input
                      readOnly
                      className={`w-3 h-3 m-1 rounded-full focus:outline-none cursor-pointer ${
                        selection === answers[3]
                          ? 'bg-orange-500 dark:bg-teal-500'
                          : ''
                      }`}
                      onClick={() => {
                        setSelection(answers[3])
                      }}
                    />
                  </div>
                  <span className='text-black dark:text-teal-500'>
                    {answers[3]}
                  </span>
                </div>
                <br />
                {movieIndex === 9 ? (
                  <button
                    type='submit'
                    className='btn bg-color text-hover px-6 py-2 rounded-md tracking-widest text-black text-xl font-semibold hover:text-darkTeal dark:hover:text-darkTeal'
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type='submit'
                    className='btn bg-color text-hover px-6 py-2 rounded-md tracking-widest text-black text-xl font-semibold hover:text-darkTeal dark:hover:text-darkTeal'
                    onClick={handleNext}
                  >
                    next
                  </button>
                )}
              </div>
            </div>
          )
        : !isLoading &&
          !isFetching && (
            <Results
              score={quizScore}
              play={handlePlayAgain}
              movies={movieQuestionsUpdt}
            />
          )}
    </>
  )
}
export default Page
