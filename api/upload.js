import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: "dvi57tjbp",
  api_key:    "317272765527647",
  api_secret: "A74wlzZ5-RSlath8LUFjKltX-JE",
})

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { file, filename } = req.body ?? {}
  if (!file) return res.status(400).json({ error: 'No file provided' })

  try {
    const slug = filename
      ? filename.replace(/\.[^/.]+$/, '').replace(/[^a-z0-9_-]/gi, '_').slice(0, 60)
      : String(Date.now())

    const result = await cloudinary.uploader.upload(file, {
      folder: 'afolaray/cars',
      public_id: `${Date.now()}_${slug}`,
      resource_type: 'image',
      overwrite: false,
    })

    res.json({ url: result.secure_url })
  } catch (err) {
    res.status(500).json({ error: err.message || 'Cloudinary upload failed' })
  }
}
