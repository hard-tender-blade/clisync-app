import signale from "signale"
import S3Module, { Bucket } from "../../../../../modules/server/services/S3/S3Module"
import errorMiddleware from "@/modules/server/middleware/errorMiddleware"
import authMiddleware from "@/modules/shared/middleware/authMiddleware"
import responses from "@/modules/server/constants/responses"
import sessionsAttachmentsController from "@/modules/server/controllers/sessionsAttachments"

//todo i think we should download the file from s3 and then rename it to the original name and then send it to the user
export async function GET(request: Request, { params }: { params: { id: string } }) {
    return errorMiddleware(async () => {
        signale.info('GET /api/attachments')
        const { userId } = authMiddleware(request)
        if (!userId) return responses.errors.unauthorized

        const attachment = await sessionsAttachmentsController.getById(params.id, userId)
        if (!attachment) return responses.errors.notFound

        const file = await S3Module.get({
            key: attachment.id,
            bucket: attachment.bucket as Bucket
        })
        if (!file) return responses.errors.notFound

        return responses.successFile(file)
    })
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    return errorMiddleware(async () => {
        signale.info('DELETE /api/attachments')
        const { userId } = authMiddleware(request)
        if (!userId) return responses.errors.unauthorized

        signale.info('params.id ---', params.id)

        const attachment = await sessionsAttachmentsController.getById(params.id, userId)
        if (!attachment) return responses.errors.notFound

        signale.info('attachment ---', attachment)

        const deleted = await S3Module.destroy(attachment.id, attachment.bucket as Bucket)
        if (!deleted) return responses.errors.notFound

        const deleted2 = await sessionsAttachmentsController.destroy(params.id, userId)
        if (!deleted2) return responses.errors.notFound

        return responses.success({})
    })
}