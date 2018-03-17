import { Client } from 'minio';
import {MINIO_ACCESS_KEY, MINIO_ENDPOINT, MINIO_PORT, MINIO_SECRET_Key, MINIO_SECURE} from "../config";

const client = new Client({
  endPoint: MINIO_ENDPOINT,
  port: MINIO_PORT,
  secure: MINIO_SECURE,
  accessKey: MINIO_ACCESS_KEY,
  secretKey: MINIO_SECRET_Key
});

