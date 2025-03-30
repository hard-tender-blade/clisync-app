import responses from "@/modules/server/constants/responses"
import sessionController from "@/modules/server/controllers/sessions"
import sessionsAttachmentsController from "@/modules/server/controllers/sessionsAttachments"
import authMiddleware from "@/modules/shared/middleware/authMiddleware"
import errorMiddleware from "@/modules/server/middleware/errorMiddleware"
import S3Module, { Bucket } from "@/modules/server/services/S3/S3Module"
import signale from "signale"

//todo mb will be good idea to move it to /api/attachments
export async function POST(req: Request, { params }: { params: { id: string } }) {
    return errorMiddleware(async () => {
        signale.info('POST /api/clients/attachments')
        const { userId } = authMiddleware(req)
        if (!userId) return responses.errors.unauthorized

        const session = await sessionController.getById(params.id, userId)
        if (!session) return responses.errors.notFound

        //get filed form request
        const data = await req.formData()

        const files = data.getAll('files')

        const uploadPromises = files.map(async (file) => {
            const bufferA = await (file as File).arrayBuffer()
            const buffer = Buffer.from(bufferA);
            const fileName = (file as File).name;

            const { key, size } = await S3Module.create(buffer, Bucket.sessions);

            const path = `/api/sessions/attachments/${key}`;

            if (!fileName || !key || !path || !size) throw new Error('Failed to upload file');
            await sessionsAttachmentsController.create({
                id: key,
                bucket: Bucket.sessions,
                fileName,
                userId,
                sessionId: session.id,
                path,
                size,
            });
        });

        await Promise.all(uploadPromises);

        const updatedSession = await sessionController.getById(params.id, userId);
        if (!updatedSession) return responses.errors.notFound

        return responses.success(updatedSession);
    }, 30000)
}

