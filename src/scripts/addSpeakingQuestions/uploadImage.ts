import fs from "fs"
import path from "path"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { v4 as uuid } from "uuid"

const region = process.env.AWS_REGION || "us-east-1"
const endpoint = process.env.S3_ENDPOINT?.replace(/\/$/, "")

const s3Client = new S3Client({
  region,
  endpoint: endpoint || undefined,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
}

const buildObjectUrl = (key: string): string => {
  const bucket = process.env.BUCKET_NAME!
  if (endpoint) return `${endpoint}/${bucket}/${key}`
  if (region === "us-east-1") return `https://${bucket}.s3.amazonaws.com/${key}`
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`
}

export async function uploadImageToS3(imageDir: string, imageFile: string, s3Subdir: string): Promise<string> {
  const tryFetch = async (source: string) => {
    const response = await fetch(source)
    if (!response.ok) {
      throw new Error(`Failed to fetch image from ${source}: ${response.status} ${response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    return Buffer.from(arrayBuffer)
  }

  let buffer: Buffer
  let ext = path.extname(imageFile).toLowerCase()

  if (/^https?:\/\//i.test(imageFile)) {
    buffer = await tryFetch(imageFile)

    const url = new URL(imageFile)
    const urlExt = path.extname(url.pathname).toLowerCase()
    if (urlExt) ext = urlExt
  } else {
    const filePath = path.join(imageDir, imageFile)

    try {
      buffer = fs.readFileSync(filePath)
    } catch (error) {
      const fallbackUrl = `https://cdn-alfastorage.alfapte.com/question-files/${imageFile}`
      console.warn(`Local image not found at ${filePath}, falling back to ${fallbackUrl}`)
      buffer = await tryFetch(fallbackUrl)
    }
  }

  const contentType = CONTENT_TYPES[ext] ?? "image/jpeg"
  const key = `${s3Subdir}/${uuid()}${ext}`

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  )

  return buildObjectUrl(key)
}
