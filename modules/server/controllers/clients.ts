import { Client } from '@/modules/shared/types/mainTypes'
import { CreateClientRequest, UpdateClientRequest } from '@/modules/shared/types/subTypes'
import db from './sequelize/squelize'
import { v4 } from 'uuid'
import { Cursor } from '@/modules/shared/types/cursor'
import { Op } from 'sequelize'

const create = async (
    clientClientRequest: CreateClientRequest,
    userId: string,
): Promise<Client | null> => {
    //validation
    if (!clientClientRequest.name || clientClientRequest.name.length < 1) return null

    const id = v4()

    const newClient = await db.clients.create({
        id,
        name: clientClientRequest.name,
        email: clientClientRequest.email,
        phoneNumber: clientClientRequest.phoneNumber,
        age: clientClientRequest.age,
        note: clientClientRequest.note,
        userId,
    })
    if (!newClient) return null

    return getById(id, userId)
}

const getById = async (id: string, userId: string): Promise<Client | null> => {
    const client = await db.clients.findOne({
        where: {
            id,
            userId,
        },
        include: [
            db.quickNotes,
            {
                model: db.sessions,
                include: [
                    db.sessionsAttachments
                ]
            },
            db.clientAttachments
        ],
        order: [
            [db.sessions, 'start', 'DESC']
        ]
    });

    if (!client) return null

    //set quickNote to empty array if undefined
    client.dataValues.quickNotes = client.dataValues.quickNotes || []

    //set sessions to empty array if undefined
    client.dataValues.sessions = client.dataValues.sessions || []

    //set clientAttachments to empty array if undefined
    client.dataValues.clientAttachments = client.dataValues.clientAttachments || []

    return client.dataValues
}

const update = async (
    id: string,
    client: UpdateClientRequest,
    userId: string,
): Promise<Client | null> => {
    const updated = await db.clients.update(
        {
            name: client.name,
            email: client.email,
            phoneNumber: client.phoneNumber,
            age: client.age,
            note: client.note,
        },
        {
            where: {
                id,
                userId,
            },
            returning: true,
        },
    )
    if (updated[0] !== 1) return null

    return getById(id, userId)
}

const destroy = async (id: string, userId: string): Promise<boolean> => {
    const deleted = await db.clients.destroy({
        where: {
            id,
            userId,
        },
    })
    return deleted === 1
}

const getClientsByUserId = async (userId: string, cursor: Cursor, search: string | null): Promise<Client[] | null> => {
    let where: any = {
        userId,
    }

    //prepare search 
    if (search) {
        where = { ...where, name: { [Op.iLike]: `%${search.replaceAll(' ', '').toLocaleLowerCase()}%` } }
    }

    const clients = await db.clients.findAll({
        where,
        include: [
            db.quickNotes,
            {
                model: db.sessions,
                include: [
                    db.sessionsAttachments
                ]
            },
            db.clientAttachments
        ],
        limit: cursor.limit,
        offset: cursor.offset || 0,
        order: [
            ['name', 'ASC'],
            [db.sessions, 'start', 'DESC'],
        ],
    })
    if (!clients) return null

    const data = clients.map((client) => client.dataValues)

    //set quickNote to empty array if undefined
    data.forEach((client) => {
        if (!client.quickNotes) client.quickNotes = []
    })

    //set sessions to empty array if undefined
    data.forEach((client) => {
        if (!client.sessions) client.sessions = []
    })

    //set clientAttachments to empty array if undefined
    data.forEach((client) => {
        if (!client.clientAttachments) client.clientAttachments = []
    })

    return data
}

const getClientsCountByUserId = async (userId: string): Promise<number> => {
    const count = await db.clients.count({
        where: {
            userId,
        },
    })

    console.log("--", count)
    return count
}

const clientsController = {
    create,
    getById,
    getClientsByUserId,
    getClientsCountByUserId,
    destroy,
    update,
}

export default clientsController
