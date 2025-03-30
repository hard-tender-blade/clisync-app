import { SignUpWithEmailRequest as SignUpWithEmailRequest } from "@/modules/shared/types/subTypes"


const signUpWithEmail = async (
    user: SignUpWithEmailRequest
): Promise<boolean> => {
    const response = await fetch('/api/auth/sign-up/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    return response.ok
}
export default signUpWithEmail