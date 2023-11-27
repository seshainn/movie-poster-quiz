import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

const handleUpload = async () => {
  try {
    const result = await cloudinary.v2.uploader.upload(
      'C:UsersseshaOneDrivePicturesScreenshotsDunkirk.jpg',
      {
        // Optionally, add any upload parameters or transformations here
        folder: 'MoviePosters',
        use_filename: true,
        unique_filename: false,
      }
    )
    console.log('Public ID:', result.public_id)
    console.log(result)
  } catch (error) {
    console.error('Error uploading image:', error)
  }
}

handleUpload()
