import { v4 } from "uuid";
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import * as fileType from "file-type";
import S3 from "./S3";

export const enum Bucket {
    clients = 'clients',
    sessions = 'sessions'
}

const create = async (buffer: Buffer, bucket: Bucket): Promise<{ key: string, size: number }> => {
    const type = await fileType.fileTypeFromBuffer(buffer);
    if (!type) throw new Error('Could not determine file type');

    const objectKey = v4();

    // Define the parameters for the upload
    const uploadParams = {
        Bucket: bucket,
        Key: objectKey,
        Body: buffer,
        ContentType: type.mime,
    };

    // Upload the file to S3
    await S3.send(new PutObjectCommand(uploadParams))

    return {
        key: objectKey,
        size: buffer.length,
    }
}

const destroy = async (key: string, bucket: Bucket): Promise<boolean> => {
    const params = {
        Bucket: bucket,
        Key: key
    };
    await S3.send(new DeleteObjectCommand(params));
    return true;
}

const get = async ({
    key,
    bucket
}: {
    key: string,
    bucket: Bucket
}): Promise<ReadableStream | null> => {
    const params = {
        Bucket: bucket,
        Key: key
    };
    const data = await S3.send(new GetObjectCommand(params));
    if (!data || !data.Body || !data.ContentType) return null
    return data.Body as ReadableStream;
}

const S3Module = {
    create,
    destroy,
    get
}
export default S3Module;