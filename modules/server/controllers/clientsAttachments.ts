import db from "./sequelize/squelize"
import { ClientAttachment } from "@/modules/shared/types/mainTypes"
import { Bucket } from "@/modules/server/services/S3/S3Module"

const create = async ({
    id,
    bucket,
    fileName,
    clientId,
    userId,
    path,
    size
}: {
    id: string,
    bucket: Bucket
    fileName: string,
    clientId: string,
    userId: string,
    path: string,
    size: number
}): Promise<boolean> => {
    const newAttachment = await db.clientAttachments.create({
        id,
        bucket,
        fileName,
        clientId,
        userId,
        path,
        size
    })
    if (!newAttachment) return false

    return true
}

const getById = async (id: string, userId: string): Promise<ClientAttachment | null> => {
    const attachment = await db.clientAttachments.findOne({
        where: {
            id,
            userId
        }
    });
    if (!attachment) return null

    return attachment.dataValues
}

const destroy = async (id: string, userId: string): Promise<boolean> => {
    const destroyed = await db.clientAttachments.destroy({
        where: {
            id,
            userId
        }
    })
    if (!destroyed) return false

    return true
}

const clientsAttachmentsController = {
    create,
    getById,
    destroy
}

export default clientsAttachmentsController