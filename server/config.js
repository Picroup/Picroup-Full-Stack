export const PORT = parseInt(process.env.PORT);

export const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT;
export const MINIO_PORT = parseInt(process.env.MINIO_PORT);
export const MINIO_SECURE = process.env.MINIO_SECURE === 'true';
export const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY;
export const MINIO_SECRET_Key = process.env.MINIO_SECRET_Key;
export const MINIO_BUCKET = process.env.MINIO_BUCKET;