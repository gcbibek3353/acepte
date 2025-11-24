import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from "uuid";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID || "";
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || "";
const bucketName = process.env.BUCKET_NAME;

const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});

export async function putObject() {
    const fileKey = `uploads/audio/${uuid()}.webm`;
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
        ContentType: "audio/webm",
    })
    const url = await getSignedUrl(s3Client, command);
    return url;  // Send PUT request to this url and send static object as binary 
}
