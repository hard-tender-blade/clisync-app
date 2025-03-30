import publicConfig from "@/modules/shared/config/publicConfig"
import { User } from "@/modules/shared/types/mainTypes"

const connectGoogleCalendar = async (userId: string, refreshToken: string): Promise<User | null> => {
    const response = await fetch(`${publicConfig.next_public_origin}/api/user/${userId}/connectGoogleCalendar`, {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
    })

    if (response.status !== 200) return null
    return response.json()
}
export default connectGoogleCalendar
