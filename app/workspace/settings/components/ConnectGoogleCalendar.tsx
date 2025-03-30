import getUserDataFromGoogleAuthCodeFlow from '@/modules/client/query/auth/getUserDataFromGoogleSignUpPage'
import connectGoogleCalendar from '@/modules/client/query/user/connectGoogleCalendar'
import { useUser } from '@/modules/client/query/user/useUser'
import { showAlert } from '@/modules/client/utils/alert/alerts'
import Loading from '@/modules/client/utils/loading/loading'
import { useGoogleLogin } from '@react-oauth/google'
import React from 'react'
import { SiGooglecalendar } from 'react-icons/si'

export default function ConnectGoogleCalendarButton() {
    const { user, isLoading: isLoadingUser, setUser } = useUser()

    const handleClick = useGoogleLogin({
        onSuccess: async ({ code }) => {
            try {
                const data = await getUserDataFromGoogleAuthCodeFlow(code)
                if (!data || !data?.tokens.refresh_token) {
                    showAlert(
                        'error',
                        'short',
                        'Failed to authenticate with Google, contact support please',
                    )
                    return
                }

                const updatedUser = await connectGoogleCalendar(
                    user.id,
                    data.tokens.refresh_token,
                )
                if (!updatedUser) {
                    showAlert(
                        'error',
                        'short',
                        'Failed to authenticate with Google, contact support please',
                    )
                    return
                }
                setUser({ ...updatedUser })
                showAlert('success', 'short', 'Google calendar connected')
            } catch (error) {
                showAlert(
                    'error',
                    'short',
                    'Failed to authenticate with Google, contact support please',
                )
            }
        },
        onError: (error) => {
            showAlert(
                'error',
                'short',
                'Failed to authenticate with Google, contact support please',
            )
        },
        flow: 'auth-code',
        scope: 'https://www.googleapis.com/auth/calendar',
    })

    if (isLoadingUser) return <Loading />

    if (user && user.googleCalendarConnected) {
        return (
            <div>
                <button className="btn btn-outline btn-success m-4 text-white">
                    <SiGooglecalendar size={25} />
                    Google calendar connected
                </button>
            </div>
        )
    }

    return (
        <div>
            <button className="btn m-4" onClick={handleClick}>
                <SiGooglecalendar size={25} />
                Connect google calendar
            </button>
        </div>
    )
}
