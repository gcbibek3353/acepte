import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from "uuid";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.BUCKET_NAME;
const region = process.env.AWS_REGION || "us-east-1";
const endpoint = process.env.S3_ENDPOINT?.replace(/\/$/, "");

if (!accessKeyId || !secretAccessKey || !bucketName) {
    throw new Error(
        "Missing AWS S3 configuration. Please set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and BUCKET_NAME."
    );
}

const s3Client = new S3Client({
    region,
    endpoint: endpoint || undefined,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

export interface PresignedUpload {
    signedUrl: string;
    objectUrl: string;
    key: string;
}

const buildObjectUrl = (key: string) => {
    if (endpoint) {
        return `${endpoint}/${bucketName}/${key}`;
    }

    if (region === "us-east-1") {
        return `https://${bucketName}.s3.amazonaws.com/${key}`;
    }

    return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
};

export async function putObject(subdir: string): Promise<PresignedUpload> {
    const normalizedSubdir = subdir.replace(/^\/+|\/+$/g, "");
    const key = `${normalizedSubdir}/${uuid()}.webm`;
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        ContentType: "audio/webm",
    });
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return {
        signedUrl,
        objectUrl: buildObjectUrl(key),
        key,
    };
}
