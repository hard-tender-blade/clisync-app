import { Session, SessionWithClient } from '@/modules/shared/types/mainTypes'
import db from './sequelize/squelize'
import { v4 } from 'uuid'
import { Op } from 'sequelize'

const create = async (
    session: {
        note: string
        start: string
        end: string
        clientId: string
        googleEventId?: string
        clientInvite?: boolean
    },
    userId: string,
): Promise<Session | null> => {
    const newSession = await db.sessions.create({
        id: v4(),
        note: session.note,
        start: session.start,
        end: session.end,
        clientId: session.clientId,
        userId,
        googleEventId: session.googleEventId,
        clientInvite: session.clientInvite,
    })
    if (!newSession) return null
    return newSession.dataValues
}

const update = async (session: Session, userId: string): Promise<Session | null> => {
    const updated = await db.sessions.update(
        {
            start: session.start,
            end: session.end,
            note: session.note,
        },
        {
            where: {
                id: session.id,
                userId,
            },
            returning: true,
        },
    )
    if (updated[0] !== 1) return null
    return updated[1][0].dataValues
}

const destroy = async (id: string, userId: string): Promise<boolean> => {
    const deleted = await db.sessions.destroy({
        where: {
            id,
            userId,
        },
    })
    return deleted === 1
}

const getById = async (id: string, userId: string): Promise<Session | null> => {
    const session = await db.sessions.findOne({
        where: {
            id,
            userId,
        },
        include: [db.sessionsAttachments],
    })
    if (!session) return null
    return session.dataValues
}

const getBasedOnTimeIntervalWithClients = async (
    userId: string,
    startDate: string,
    endDate: string,
): Promise<SessionWithClient[] | null> => {
    console.log("fetching all" + "start" + startDate + "end" + endDate)
    const sessions = await db.sessions.findAll({
        where: {
            userId,
            start: {
                [Op.gte]: startDate,
                [Op.lte]: endDate,
            },
        },
        include: [
            db.sessionsAttachments,
            db.clients
        ],
        order: [['start', 'ASC']],
    })
    if (!sessions) return null
    const result = sessions.map((s) => {
        const session = s.dataValues;
        return {
            ...session,
            client: session.client.dataValues,
        }
    });
    console.log("result", result.length, result)

    return result
}

const sessionController = {
    create,
    update,
    destroy,
    getById,
    getBasedOnTimeIntervalWithClients,
}
export default sessionController
