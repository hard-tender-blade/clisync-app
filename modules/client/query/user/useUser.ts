import publicConfig from '@/modules/shared/config/publicConfig'
import { User } from '@/modules/shared/types/mainTypes'
import axios from 'axios'
import { useState, useEffect } from 'react'

export const getUser = async (): Promise<User | null> => {
    try {
        const result = await axios({
            method: 'get',
            url: `${publicConfig.next_public_origin}/api/user`,
        })
        if (!result.data) return null
        return result.data as User
    } catch (error) {
        console.error('getUser', error)
        return null
    }

}


//custom hook useUser

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getUser().then((data) => {
            setUser(data)
            setIsLoading(false)
        })
    }, [])

    return { user, isLoading, setUser }
}