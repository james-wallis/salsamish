const fs = require('fs-extra');
const path = require('path');
const AWS = require('aws-sdk');

const { AWS_ACCESS_KEY, AWS_SECRET_KEY, NODE_ENV } = process.env;
const S3_BUCKET = 'salsamish';
const S3_BUCKET_DIR = `${S3_BUCKET}/${(NODE_ENV === 'production') ? 'public' : 'test'}`;

AWS.config.update({ region: 'eu-west-2' });

const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
});

const uploadImageToS3 = async (filePath, fileName) => {
    const image = await fs.readFile(filePath);

    const params = {
        Bucket: S3_BUCKET_DIR,
        Key: fileName, // File name you want to save as in S3
        Body: image,
        ACL: 'public-read',
    };

    const data = await s3.upload(params).promise();
    return data;
};

const deleteImageFromS3 = async (filePath) => {
    const fileName = path.basename(filePath);
    const params = {
        Bucket: S3_BUCKET_DIR,
        Key: fileName,
    };
    await s3.deleteObject(params).promise();
};

module.exports = {
    uploadImageToS3,
    deleteImageFromS3,
};