import { User } from '@/modules/shared/types/mainTypes'
import db from './sequelize/squelize'
import { Op } from 'sequelize'

interface UserCreate {
    id: string
    lang: string
    email: string
    name?: string
    googleAuth: boolean
    googleCalendarConnected: boolean
}
const create = async (data: UserCreate): Promise<User | null> => {
    const userCreated = await db.users.create({
        id: data.id,
        lang: data.lang,
        email: data.email,
        googleAuth: data.googleAuth,
        googleCalendarConnected: data.googleCalendarConnected,
        isPubliclyListed: false,
        twoFAEnabled: false,
    })
    return userCreated.dataValues
}

const getById = async (id: string): Promise<User | null> => {
    const user = await db.users.findOne({
        where: {
            id,
        },
    })
    if (!user) return null
    return user.dataValues
}

const getByEmail = async (email: string): Promise<User | null> => {
    const user = await db.users.findOne({
        where: {
            email,
        },
    })
    if (!user) return null
    return user.dataValues
}
const update = async (id: string, data: User): Promise<User | null> => {
    const updatedUser = await db.users.update(data, {
        where: {
            id,
        },
    })
    if (!updatedUser) return null
    return getById(id)
}

const getUsersBySearch = async (search: string): Promise<User[] | null> => {
    const where = search ? {
        city: {
            [Op.iLike]: `%${search.replaceAll(' ', '').toLocaleLowerCase()}%`,
        },
        isPubliclyListed: true,
    } : {
        isPubliclyListed: true,
    }

    const allUsers = await db.users.findAll({ where })
    if (!allUsers) return null

    return allUsers.map((user) => user.dataValues)
}

const usersController = {
    create,
    getById,
    getByEmail,
    update,
    getUsersBySearch,
}
export default usersController
