import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const form = formidable({ maxFileSize: 20 * 1024 * 1024 });
  let fields, files;
  try {
    [fields, files] = await form.parse(req);
  } catch (err) {
    return res.status(400).json({ error: "Failed to parse upload" });
  }

  const file = files.file?.[0];
  if (!file) return res.status(400).json({ error: "No file provided" });

  const folder = fields.folder?.[0] || "afolaray/cars";

  try {
    const result = await cloudinary.uploader.upload(file.filepath, {
      folder,
      resource_type: "auto",
      overwrite: false,
    });
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: err.message || "Cloudinary upload failed" });
  }
}
