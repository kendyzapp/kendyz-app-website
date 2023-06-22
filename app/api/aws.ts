"use server";
import { PutObjectCommand, S3, S3Client } from "@aws-sdk/client-s3"
import { randomUUID } from "crypto";

const fileToBlob = async (file: File) => Buffer.from(await file.arrayBuffer());


export default async function aws(file: Buffer, type: string, name: String) {
  try {
    const key = randomUUID()
    const fileParams = {
      Bucket: process.env.STORAGE_BUCKET_PUBLIC,
      Expires: 600,
      ContentType: "image/png"
    }
    
    console.log(file);
    // let blob = await fileToBlob(file)

    const s3 = new S3Client({
      endpoint: process.env.STORAGE_ENDPOINT,
      credentials: {
        accessKeyId: process.env.STORAGE_ACCESS_KEY_ID!,
        secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY!,
      }});
      
        // Faites quelque chose avec l'ArrayBuffer
        const command = new PutObjectCommand({
          Bucket: process.env.STORAGE_BUCKET_PUBLIC,
          Body: file,
          Key: key + "-" +  name,
         // Body: 'hello world',
          ContentType: type
          // Key: 'file-upload.txt',
          // Body: 'hello world',
        });
        
      const url = await s3?.send(command)
  } catch (err) {
    console.error(err);
  }
}