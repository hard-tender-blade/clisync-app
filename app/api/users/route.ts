import usersController from '@/modules/server/controllers/users'
import responses from '../../../modules/server/constants/responses'
import errorMiddleware from '../../../modules/server/middleware/errorMiddleware'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    return errorMiddleware(async () => {
        //get cursor from query
        const searchParams = req.nextUrl.searchParams
        const search = searchParams.get('query')

        const users = await usersController.getUsersBySearch(search)
        console.log(users)
        if (!users) return responses.errors.notFound
        return responses.success(users)
    })
}

