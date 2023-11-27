'use client'
import cloudinary from '@/utils/cloudinaryConfig'
import { useState, ChangeEvent } from 'react'

const UploadImage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error('No file selected.')
      return
    }

    try {
      const result = await cloudinary.v2.uploader.upload(selectedFile.name, {
        // Optionally, add any upload parameters or transformations here
        folder: 'MoviePosters',
        use_filename: true,
        unique_filename: false,
      })
      console.log('Public ID:', result.public_id)
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
      <button type='button' onClick={handleUpload}>
        Upload Image
      </button>
      {/* Add any other UI or components as needed */}
    </div>
  )
}

export default UploadImage
