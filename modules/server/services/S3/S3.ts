
import { S3Client } from '@aws-sdk/client-s3';
import config from '@/modules/shared/config/config';

const S3 = new S3Client({
    forcePathStyle: true,
    region: config.s3_region,
    endpoint: config.s3_endpoint,
    credentials: {
        accessKeyId: config.s3_access_key_id,
        secretAccessKey: config.s3_secret_access_key,
    }
})

export default S3;