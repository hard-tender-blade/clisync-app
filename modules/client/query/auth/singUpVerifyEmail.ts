

const signUpVerifyEmail = async (token: string): Promise<boolean> => {
    const response = await fetch(`/api/auth/sign-up/email/verification/${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.ok
}
export default signUpVerifyEmail