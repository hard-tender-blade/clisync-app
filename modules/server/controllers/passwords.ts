import { Transaction } from 'sequelize'
import db from './sequelize/squelize'
import { Password } from '@/modules/shared/types/mainTypes'

const create = async (
    userId: string,
    password: string,
    email: string,
    transaction?: Transaction
): Promise<Boolean> => {
    const createdPassword = await db.passwords.create({
        id: userId,
        userId,
        password,
        email,
    })

    if (!createdPassword) return false
    return true
}
const getByEmail = async (email: string): Promise<Password | null> => {
    if (!email) return null
    const password = await db.passwords.findOne({
        where: {
            email: email,
        },
    })
    if (!password) return null

    return password.dataValues
}

const passwordsController = {
    getByEmail,
    create,
}

export default passwordsController
