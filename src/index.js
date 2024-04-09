const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
// 5 mins
const EXPIRE_IN = 60 * 5;
const s3Client = new S3Client();

module.exports.presignedUrl = async (event) => {

  const { key: Key } = event.queryStringParameters;
  const { type } = event.pathParameters;
  const Bucket = process.env.BUCKET;

  let command;

  switch(type) {

    case 'get':
      command = new GetObjectCommand({
        Bucket,
        Key,
      });
    break;

    case 'put':
      command = new PutObjectCommand({
        Bucket,
        Key,
      });
      break;

  }

  let body = {};
  if (command) {
    body = {
      filename: Key,
      expiresIn: EXPIRE_IN,
      url: await getSignedUrl(s3Client, command, { expiresIn: EXPIRE_IN })
    }
  }

  return {
    body: JSON.stringify(body),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,GET'
    },
    statusCode: 200
  }

};
