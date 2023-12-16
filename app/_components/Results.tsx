import { useState } from 'react'
import Dialog from './Dialog'
import Image from 'next/image'
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
const Results = ({
  score,
  play,
  movies,
}: {
  score: number
  play: () => void
  movies: Movie[]
}) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className='flex flex-col flex-center px-12 space-y-10'>
      <div className='flex flex-center space-x-2'>
        <h1 className='text-black dark:text-white font-bold text-2xl'>
          Your score is {score}/10
        </h1>
        <button
          type='submit'
          className='btn bg-color text-hover px-2 py-2 rounded-md tracking-widest text-black text-md font-semibold hover:text-darkTeal dark:hover:text-darkTeal'
          onClick={() => {
            setDialogOpen(true)
          }}
        >
          View results
        </button>
      </div>
      {dialogOpen && (
        <Dialog
          onClose={() => {
            setDialogOpen(false)
          }}
        >
          <div className='flex flex-col gap-4'>
            {movies.map((movie) => (
              <div
                key={movie.id}
                className='flex flex-start bg-white p-4 shadow-md rounded-md gap-4'
              >
                <Image
                  src={movie.url}
                  alt={movie.id}
                  width={200}
                  height={100}
                  style={{ objectFit: 'cover' }}
                  className='rounded-md'
                />
                <div>
                  <p className='text-green-500 font-semibold'>
                    {movie.rightans}
                  </p>
                  <p
                    className={`${
                      movie.chosen === movie.wrong1 &&
                      'text-red-500 font-semibold'
                    }`}
                  >
                    {movie.wrong1}
                  </p>
                  <p
                    className={`${
                      movie.chosen === movie.wrong2 &&
                      'text-red-500 font-semibold'
                    }`}
                  >
                    {movie.wrong2}
                  </p>
                  <p
                    className={`${
                      movie.chosen === movie.wrong3 &&
                      'text-red-500 font-semibold'
                    }`}
                  >
                    {movie.wrong3}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Dialog>
      )}
      <button
        type='submit'
        className='btn bg-color text-hover px-6 py-2 rounded-md tracking-widest text-black text-lg font-semibold hover:text-darkTeal dark:hover:text-darkTeal'
        onClick={() => {
          play()
        }}
      >
        Play again
      </button>
    </div>
  )
}

export default Results
