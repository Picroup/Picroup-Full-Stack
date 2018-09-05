/**
 * Created by Air on 2018/8/16.
 */


import {presignedPutURL} from "../../../usecases/minio/index";

export const createPresignedPutURLResolver = ({dependency: {

}}) => async (_, {minioId}) => await presignedPutURL({minioId});