/**
 * Created by Air on 2018/8/16.
 */

import { Client } from 'minio';
import {
  MINIO_ACCESS_KEY,
  MINIO_BUCKET,
  MINIO_ENDPOINT,
  MINIO_PORT,
  MINIO_SECRET_Key,
  MINIO_SECURE
} from "../../config";

const client = new Client({
  endPoint: MINIO_ENDPOINT,
  port: MINIO_PORT,
  secure: MINIO_SECURE,
  accessKey: MINIO_ACCESS_KEY,
  secretKey: MINIO_SECRET_Key
});

export const urlFor = ({minioId}) => `http://minio.picroup.com:9000/${MINIO_BUCKET}/${minioId}`;
export const presignedPutURL = async ({minioId}) => await client.presignedPutObject(MINIO_BUCKET, minioId, 60);
export const remove = async ({minioId}) => await client.removeObject(MINIO_BUCKET, minioId);