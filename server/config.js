export const PORT = parseInt(process.env.PORT);

export const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT;
export const MINIO_PORT = parseInt(process.env.MINIO_PORT);
export const MINIO_SECURE = process.env.MINIO_SECURE === 'true';
export const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY;
export const MINIO_SECRET_Key = process.env.MINIO_SECRET_Key;
export const MINIO_BUCKET = process.env.MINIO_BUCKET;

export const MONGODB_HOST = process.env.MONGODB_HOST;
export const MONGODB_PORT = parseInt(process.env.MONGODB_PORT);
export const MONGODB_DATABASE = process.env.MONGODB_DATABASE;
export const MONGODB_USER = process.env.MONGODB_USER;
export const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

export const JWT_SECRET = process.env.JWT_SECRET;

