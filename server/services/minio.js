import {presignedPutURL, urlFor} from "../usecases/minio/index";

// this is deprecated since the url is not available for mp4:   http://host.com/s3?name=abc.mp4
const s3 = async (request, response) => {
  const url = urlFor({minioId: request.query.name});
  response.redirect(url);
};

// this is preferred way:   http://host.com/files/abc.mp4
const files = async (request, response) => {
  const url = urlFor({minioId: request.path});
  response.redirect(url);
};

const signed = async (request, response) => {
  const signedURL = await presignedPutURL({minioId: request.query.name});
  response.json({signedURL});
};

export { s3, files, signed };