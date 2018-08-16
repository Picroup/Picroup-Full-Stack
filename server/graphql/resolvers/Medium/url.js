/**
 * Created by Air on 2018/8/6.
 */


import {urlFor} from "../../../usecases/minio/index";
export const createURLResolver = ({dependency: {

}}) => async ({minioId}) => urlFor({minioId});
