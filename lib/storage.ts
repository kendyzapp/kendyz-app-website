import { S3Client } from "@aws-sdk/client-s3";

declare global {
  var storage: S3Client | undefined;
}

const storage =
  global.storage ||
  new S3Client({
    endpoint: process.env.STORAGE_ENDPOINT,
    credentials: {
      accessKeyId: process.env.STORAGE_ACCESS_KEY_ID!,
      secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY!,
    },
  });

if (process.env.NODE_ENV === "development") global.storage = storage;

export default storage;
