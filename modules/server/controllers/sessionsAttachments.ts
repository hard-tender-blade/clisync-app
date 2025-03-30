import db from "./sequelize/squelize"
import { ClientAttachment } from "@/modules/shared/types/mainTypes"
import { Bucket } from "@/modules/server/services/S3/S3Module"

const create = async ({
    id,
    bucket,
    fileName,
    userId,
    sessionId,
    path,
    size
}: {
    id: string,
    userId: string,
    sessionId: string,
    bucket: Bucket
    fileName: string,
    path: string,
    size: number
}): Promise<boolean> => {
    const newAttachment = await db.sessionsAttachments.create({
        id,
        bucket,
        fileName,
        sessionId,
        userId,
        path,
        size
    })
    if (!newAttachment) return false

    return true
}

const getById = async (id: string, userId: string): Promise<ClientAttachment | null> => {
    const attachment = await db.sessionsAttachments.findOne({
        where: {
            id,
            userId
        }
    });
    if (!attachment) return null

    return attachment.dataValues
}

const destroy = async (id: string, userId: string): Promise<boolean> => {
    const destroyed = await db.sessionsAttachments.destroy({
        where: {
            id,
            userId
        }
    })
    if (!destroyed) return false

    return true
}

const sessionsAttachmentsController = {
    create,
    getById,
    destroy
}

export default sessionsAttachmentsController