import Image from 'next/image'

const Login = () => {
  return (
    <div className='h-screen w-full flex flex-col'>
      <div className='h-14 w-full bg-pink-500 flex-between z-10'>
        <div className='fixed w-full h-screen top-0 bottom-0 left-0 bg-red-500 z-20'></div>
      </div>
      <div className='flex-1 bg-green-500 flex items-center justify-center z-0'>
        <div className='bg-blue-500 h-96 w-96 relative z-0'>
          <Image
            src='/collage.jpg'
            alt='collage'
            fill
            style={{ objectFit: 'cover' }}
            className='opacity-30 dark:bg-dark-100'
          />
          <button className='px-4 py-4 bg-black text-white rounded-full absolute'>
            ClickMe
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
