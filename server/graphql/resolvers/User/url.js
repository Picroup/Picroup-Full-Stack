/**
 * Created by Air on 2018/8/16.
 */

import {urlFor} from "../../../usecases/minio/index";

export const createURLResolver = ({dependency: {

}}) => async ({avatarId}) => avatarId && urlFor({minioId: avatarId});
