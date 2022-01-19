require('dotenv').config()
const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

exports.uploads = async ({ file }) => {
  const { path } = file
  const fName = file.originalname.split('.')[0]
  try {
    return await cloudinary.uploader.upload(
      path,
      {
        resource_type: 'video',
        public_id: `VideoUploads/${fName}`,
        chunk_size: 6000000,
        eager: [
          {
            width: 300,
            height: 300,
            crop: 'pad',
            audio_codec: 'none'
          },
          {
            width: 160,
            height: 100,
            crop: 'crop',
            gravity: 'south',
            audio_codec: 'none'
          }
        ]
      },
      { resource_type: 'video' },
      (err, video) => {
        if (err) return res.status(500).send(err)

        fs.unlinkSync(path)
        return res.status(200).send(video)
      }
    )
  } catch (err) {
    return res.status(500).send(err)
  }
}
