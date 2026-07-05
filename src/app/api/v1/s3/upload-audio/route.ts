import { auth_middleware } from "@/lib/auth-middleware";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.BUCKET_NAME;
const region = process.env.AWS_REGION || "us-east-1";
const endpoint = process.env.S3_ENDPOINT?.replace(/\/$/, "");

if (!accessKeyId || !secretAccessKey || !bucketName) {
    throw new Error("Missing AWS S3 configuration");
}

const s3Client = new S3Client({
    region,
    endpoint: endpoint || undefined,
    credentials: { accessKeyId, secretAccessKey },
});

const buildObjectUrl = (key: string) => {
    if (endpoint) {
        return `${endpoint}/${bucketName}/${key}`;
    }
    if (region === "us-east-1") {
        return `https://${bucketName}.s3.amazonaws.com/${key}`;
    }
    return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
};

export async function POST(request: NextRequest) {
    try {
        const authCheck = await auth_middleware(request);
        if (!authCheck.authenticated || !authCheck.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        const audioFile = formData.get("audio") as File;
        const subdir = (formData.get("subdir") as string) || "speaking-read-aloud";

        if (!audioFile) {
            return NextResponse.json(
                { success: false, message: "Audio file is required" },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await audioFile.arrayBuffer());

        // Respect the uploaded file's real format (web sends audio/webm, mobile
        // sends audio/m4a etc.) instead of hardcoding webm, so the stored object
        // and its content-type match the actual bytes.
        const contentType = audioFile.type || "audio/webm";
        const EXT_BY_TYPE: Record<string, string> = {
            "audio/webm": "webm",
            "audio/mp4": "m4a",
            "audio/m4a": "m4a",
            "audio/x-m4a": "m4a",
            "audio/aac": "aac",
            "audio/mpeg": "mp3",
            "audio/wav": "wav",
            "audio/x-wav": "wav",
            "audio/3gpp": "3gp",
            "audio/ogg": "ogg",
        };
        const nameExt = (audioFile.name?.split(".").pop() || "").toLowerCase();
        const ext = /^[a-z0-9]{1,5}$/.test(nameExt)
            ? nameExt
            : EXT_BY_TYPE[contentType] || "webm";
        const key = `${subdir}/${uuid()}.${ext}`;

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: buffer,
            ContentType: contentType,
        });

        await s3Client.send(command);

        const objectUrl = buildObjectUrl(key);

        return NextResponse.json({
            success: true,
            message: "Audio uploaded successfully",
            audioUrl: objectUrl,
            key,
        });
    } catch (error) {
        console.error("Error uploading audio:", error);
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : "Upload failed",
            },
            { status: 500 }
        );
    }
}
