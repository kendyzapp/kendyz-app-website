"use server";
import { PutObjectCommand, S3, S3Client } from "@aws-sdk/client-s3"

export default async function aws(file: File){
  try {
    const fileParams = {
      Bucket: process.env.STORAGE_BUCKET_PUBLIC,
      Key: file.name,
      Expires: 600,
      ContentType: file.type
    }
    const s3 = new S3Client({
      endpoint: process.env.STORAGE_ENDPOINT,
      credentials: {
        accessKeyId: process.env.STORAGE_ACCESS_KEY_ID!,
        secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY!,
      }});
      const command = new PutObjectCommand({
        Bucket: process.env.STORAGE_BUCKET_PUBLIC,
        Key: file.name,
        Body: "Hello S3!",
        ContentType: file.type
      });
      
    const url = await storage?.send(command)
  } catch (err) {
    console.error(err);
  }
}