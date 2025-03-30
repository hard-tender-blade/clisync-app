import publicConfig from '@/modules/shared/config/publicConfig'
import { User } from '@/modules/shared/types/mainTypes'
import axios from 'axios'

export const updateUser = async (user: User): Promise<User> => {
    const response = await axios({
        method: 'put',
        url: `${publicConfig.next_public_origin}/api/user`,
        data: JSON.stringify(user),
    })

    if (!response.data) throw new Error('Failed to update user')
    return response.data as User
}
