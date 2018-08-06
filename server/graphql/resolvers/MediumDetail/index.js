/**
 * Created by Air on 2018/8/6.
 */

import {urlFor} from "../../../usecases/url/index";

export const createMediumDetailResolver = ({dependency: {

}}) => ({
  videoUrl: async ({videoMinioId}) => videoMinioId && urlFor({minioId: videoMinioId})
});