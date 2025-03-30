import { QuickNote } from "@/modules/shared/types/mainTypes";
import db from "./sequelize/squelize";
import { v4 } from "uuid";
import signale from "signale";
import { Op } from "sequelize";

const create = async (quickNote: QuickNote, userId: string): Promise<QuickNote | null> => {
    const newQuickNote = await db.quickNotes.create({
        id: v4(),
        note: quickNote.note,
        clientId: quickNote.clientId,
        userId
    })
    if (!newQuickNote) return null
    return newQuickNote.dataValues
}

const bulkCreate = async (quickNotes: QuickNote[], userId: string): Promise<QuickNote[] | null> => {
    const newQuickNotes = await db.quickNotes.bulkCreate(quickNotes.map(note => ({
        id: v4(),
        note: note.note,
        clientId: note.clientId,
        userId
    })))
    if (!newQuickNotes) return null
    return newQuickNotes.map(note => note.dataValues)
}

const update = async (quickNote: QuickNote, userId: string): Promise<QuickNote | null> => {
    const updated = await db.quickNotes.update({
        note: quickNote.note
    }, {
        where: {
            id: quickNote.id,
            userId
        },
        returning: true
    });
    if (updated[0] !== 1) return null
    return updated[1][0].dataValues
}

const destroy = async (id: string, userId: string): Promise<boolean> => {
    const deleted = await db.quickNotes.destroy({
        where: {
            id,
            userId
        }
    });
    return deleted === 1
}

const bulkDestroy = async (ids: string[], userId: string): Promise<boolean> => {
    const deleted = await db.quickNotes.destroy({
        where: {
            id: {
                [Op.in]: ids
            },
            userId
        }
    });
    return deleted === ids.length

}

const getQuickNotesByClientId = async (clientId: string, userId: string): Promise<QuickNote[] | null> => {
    const quickNotes = await db.quickNotes.findAll({
        where: {
            clientId,
            userId
        }
    })
    if (!quickNotes) return null
    return quickNotes.map((note: any) => note.dataValues)
}

const process = async (clientId: string, newQuickNotes: QuickNote[], oldQuickNotes: QuickNote[], userId: string): Promise<QuickNote[] | null> => {
    // check if all notes belong to the client
    if (newQuickNotes.some(note => note.clientId !== clientId)) return null

    // check if all notes belong to the user
    if (newQuickNotes.some(note => note.userId !== userId)) return null

    const notesToCreate = newQuickNotes.filter((note: QuickNote) => !oldQuickNotes.find((n: QuickNote) => n.id === note.id))
    const notesToUpdate = newQuickNotes.filter((note: QuickNote) => oldQuickNotes.find((n: QuickNote) => n.id === note.id))
    const notesToDelete = oldQuickNotes.filter((note: QuickNote) => !newQuickNotes.find(n => n.id === note.id))

    const t = await db.sequelize.transaction()

    try {
        const createdNotes = await bulkCreate(notesToCreate, userId)
        if (!createdNotes) {
            await t.rollback()
            return null
        }

        for (const note of notesToUpdate) {
            const updatedNote = await update(note, userId)
            if (!updatedNote) {
                await t.rollback()
                return null
            }
        }

        const ok = await bulkDestroy(notesToDelete.map(note => note.id), userId)
        if (!ok) {
            await t.rollback()
            return null
        }

        await t.commit()

        return await getQuickNotesByClientId(clientId, userId)
    } catch (e) {
        signale.error(e)
        console.error(e)
        await t.rollback()
        return null
    }
}

const quickNotesController = {
    getQuickNotesByClientId,
    bulkDestroy,
    bulkCreate,
    create,
    update,
    destroy,
    process
}
export default quickNotesController;