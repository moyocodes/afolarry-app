export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.startsWith("https://res.cloudinary.com/")) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  let upstream;
  try {
    upstream = await fetch(url);
  } catch {
    return res.status(502).json({ error: "Failed to fetch file" });
  }

  if (!upstream.ok) return res.status(upstream.status).end();

  const filename = decodeURIComponent(url.split("/").pop() || "id-card");
  const contentType =
    upstream.headers.get("Content-Type") || "application/octet-stream";

  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader("Content-Type", contentType);

  const buffer = await upstream.arrayBuffer();
  res.send(Buffer.from(buffer));
}
