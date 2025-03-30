import responses from "@/modules/server/constants/responses"
import clientsController from "@/modules/server/controllers/clients"
import clientsAttachmentsController from "@/modules/server/controllers/clientsAttachments"
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

        const client = await clientsController.getById(params.id, userId)
        if (!client) return responses.errors.notFound

        //get filed form request
        const data = await req.formData()

        const files = data.getAll('files')

        signale.info('attachments count --', files.length)

        const uploadPromises = files.map(async (file) => {
            const bufferA = await (file as File).arrayBuffer()
            const buffer = Buffer.from(bufferA);
            const fileName = (file as File).name;

            const { key, size } = await S3Module.create(buffer, Bucket.clients);
            const path = `/api/clients/attachments/${key}`;


            if (!fileName || !key || !path || !size) throw new Error('Failed to upload file');
            await clientsAttachmentsController.create({
                id: key,
                bucket: Bucket.clients,
                fileName,
                userId,
                clientId: client.id,
                path,
                size,
            });
        });

        await Promise.all(uploadPromises);

        const updatedClient = await clientsController.getById(params.id, userId)
        if (!updatedClient) return responses.errors.notFound

        return responses.success(updatedClient)
    }, 30000)
}

