import { Client } from 'minio';
import {
  MINIO_ACCESS_KEY,
  MINIO_BUCKET,
  MINIO_ENDPOINT,
  MINIO_PORT,
  MINIO_SECRET_Key,
  MINIO_SECURE
} from "../config";

const client = new Client({
  endPoint: MINIO_ENDPOINT,
  port: MINIO_PORT,
  secure: MINIO_SECURE,
  accessKey: MINIO_ACCESS_KEY,
  secretKey: MINIO_SECRET_Key
});

const s3 = async (request, response) => {
  // const url = await client.presignedGetObject(MINIO_BUCKET, request.query.name, 60);
  const url = `http://minio.picroup.com:9000/${MINIO_BUCKET}/${request.query.name}`;
  response.redirect(url);
};

const signed = async (request, response) => {
  const signedURL = await client.presignedPutObject(MINIO_BUCKET, request.query.name, 60);
  response.json({signedURL});
};

const deleteS3Object = async (name) => {
  await client.removeObject(MINIO_BUCKET, name)
};

export { s3, signed, deleteS3Object };