# Generate S3 presigned urls for object read and write

This service demonstrate how to use AWS S3 presigned urls to upload file directly to defined S3 bucket. I created lambda 
function for generating GetObject and PutObject [presigned urls](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html). 
To restrict unwanted access to this endpoint I used lambda authorizer. Under `test/index.html` you will find an example 
how to get presigned put url from endpoint and later use it to upload file with Axios.

This is example url that will be generated after deployment.

```
 https://<xxxxxxxxxx>.execute-api.eu-central-1.amazonaws.com/dev/s3/presigned-url/<get|put>?key=<filename.png>
```
You have to pass 2 params path param and query param.

## Overview

Check `serverless.yml` for details.

### How to deploy

I have multiple AWS credentials defined locally that's why Iam using serverless.js `profile` option to select preferred credentials.

To deploy just run:

```bash
    npm run deploy:dev
```
OR

```bash
    npm run deploy:prod
```

