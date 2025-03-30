import db from "./sequelize/squelize"
import { v4 } from "uuid";

const create = async (userId: string, token: string): Promise<string | null> => {
    const newToken = await db.googleRefreshTokens.create({
        id: v4(),
        userId,
        token,
    });
    if (!newToken) return null
    return newToken.dataValues.token
}

const update = async (userId: string, token: string): Promise<string | null> => {
    const updated = await db.googleRefreshTokens.update({
        token
    }, {
        where: {
            userId
        },
        returning: true
    });
    if (updated[0] !== 1) return null
    return updated[1][0].dataValues.token
}

const getByUserId = async (userId: string): Promise<string | null> => {
    const token = await db.googleRefreshTokens.findOne({
        where: {
            userId
        }
    });
    if (!token) return null
    return token.dataValues.token
}

const googleRefreshTokensController = {
    create,
    update,
    getByUserId
}
export default googleRefreshTokensController