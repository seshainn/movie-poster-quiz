'use server'
import { db } from '@/db'
import lqip from 'lqip-modern'

const LqipGenerate = async () => {
  const movies = await db.movie.findMany()
  for (let i = 0; i < movies.length; i++) {
    const url = movies[i].url
    const imgData = await fetch(url)
    const arrayBufferData = await imgData.arrayBuffer()
    const lqipData = await lqip(Buffer.from(arrayBufferData))
    const width = lqipData.metadata.originalWidth
    const height = lqipData.metadata.originalHeight
    const blurURL = lqipData.metadata.dataURIBase64
    await db.movie.update({
      where: {
        id: movies[i].id,
      },
      data: {
        width: width,
        height: height,
        blururl: blurURL,
      },
    })
  }

  return <div className='flex flex-col flex-center'>Update complete</div>
}

export default LqipGenerate
