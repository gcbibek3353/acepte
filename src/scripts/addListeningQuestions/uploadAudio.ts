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
  ".mp3": "audio/mpeg",
  ".webm": "audio/webm",
  ".wav": "audio/wav",
  ".m4a": "audio/mp4",
  ".ogg": "audio/ogg",
}

const createSilentWavBuffer = (): Buffer => {
  const sampleRate = 44100
  const channels = 1
  const bytesPerSample = 2
  const durationSeconds = 1
  const dataSize = sampleRate * channels * bytesPerSample * durationSeconds
  const buffer = Buffer.alloc(44 + dataSize)

  buffer.write("RIFF", 0)
  buffer.writeUInt32LE(36 + dataSize, 4)
  buffer.write("WAVE", 8)
  buffer.write("fmt ", 12)
  buffer.writeUInt32LE(16, 16)
  buffer.writeUInt16LE(1, 20)
  buffer.writeUInt16LE(channels, 22)
  buffer.writeUInt32LE(sampleRate, 24)
  buffer.writeUInt32LE(sampleRate * channels * bytesPerSample, 28)
  buffer.writeUInt16LE(channels * bytesPerSample, 32)
  buffer.writeUInt16LE(bytesPerSample * 8, 34)
  buffer.write("data", 36)
  buffer.writeUInt32LE(dataSize, 40)

  return buffer
}

const buildObjectUrl = (key: string): string => {
  const bucket = process.env.BUCKET_NAME!
  if (endpoint) return `${endpoint}/${bucket}/${key}`
  if (region === "us-east-1") return `https://${bucket}.s3.amazonaws.com/${key}`
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`
}

export async function uploadAudioToS3(audioDir: string, audioFile: string, s3Subdir: string): Promise<string> {
  let buffer: Buffer
  let ext = path.extname(audioFile).toLowerCase()

  const tryFetch = async (source: string): Promise<Buffer | null> => {
    try {
      const response = await fetch(source)
      if (!response.ok) {
        return null
      }

      const arrayBuffer = await response.arrayBuffer()
      return Buffer.from(arrayBuffer)
    } catch {
      return null
    }
  }

  if (/^https?:\/\//i.test(audioFile)) {
    const fetched = await tryFetch(audioFile)
    if (!fetched) {
      console.warn(`Remote audio could not be fetched: ${audioFile}. Using silent placeholder.`)
      buffer = createSilentWavBuffer()
      ext = ".wav"
    } else {
      buffer = fetched

      const url = new URL(audioFile)
      const urlExt = path.extname(url.pathname).toLowerCase()
      if (urlExt) ext = urlExt
    }
  } else {
    const filePath = path.join(audioDir, audioFile)

    try {
      buffer = fs.readFileSync(filePath)
    } catch {
      const fallbackUrl = `https://cdn-alfastorage.alfapte.com/question-files/${audioFile}`
      console.warn(`Local audio not found at ${filePath}, falling back to ${fallbackUrl}`)

      const fetched = await tryFetch(fallbackUrl)
      if (!fetched) {
        console.warn(`CDN fallback failed for ${audioFile}. Using silent placeholder.`)
        buffer = createSilentWavBuffer()
        ext = ".wav"
      } else {
        buffer = fetched
      }
    }
  }

  const contentType = CONTENT_TYPES[ext] ?? "audio/mpeg"
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
