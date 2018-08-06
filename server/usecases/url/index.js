/**
 * Created by Air on 2018/8/6.
 */

import {MINIO_BUCKET} from "../../config";

export const urlFor = ({minioId}) => `http://minio.picroup.com:9000/${MINIO_BUCKET}/${minioId}`;