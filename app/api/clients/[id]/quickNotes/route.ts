import responses from "../../../../../modules/server/constants/responses";
import errorMiddleware from "../../../../../modules/server/middleware/errorMiddleware";
import authMiddleware from "../../../../../modules/shared/middleware/authMiddleware";
import quickNotesController from "../../../../../modules/server/controllers/quickNotes";
import { QuickNote } from "@/modules/shared/types/mainTypes";

export async function POST(request: Request, { params }: { params: { id: string } }) {
    return errorMiddleware(async () => {
        const { userId } = authMiddleware(request)
        if (!userId) return responses.errors.unauthorized

        const notesToProcess: QuickNote[] = await request.json()
        if (!notesToProcess) return responses.errors.invalidRequest

        const oldClientNotes = await quickNotesController.getQuickNotesByClientId(params.id, userId)
        if (!oldClientNotes) return responses.errors.serverError

        const processResult = await quickNotesController.process(params.id, notesToProcess, oldClientNotes, userId)
        if (!processResult) return responses.errors.serverError

        return responses.success(processResult)
    })
}