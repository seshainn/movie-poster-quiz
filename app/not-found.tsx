import Image from 'next/image'

const NotFound = () => {
  return (
    <div>
      <Image
        src='/NotFound.jpg'
        alt='not-found'
        fill
        style={{ objectFit: 'cover' }}
        className='opacity-60 -z-10'
      />
      <div className='flex flex-col flex-center h-screen'>
        <h1 className='text-darkOrange dark:text-lightTeal text-center text-4xl font-bold'>
          404 | This page could not be found
        </h1>
      </div>
    </div>
  )
}

export default NotFound
