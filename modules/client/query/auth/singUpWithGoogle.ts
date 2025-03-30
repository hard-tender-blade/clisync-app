import { SignUpWithGoogleRequest } from "@/modules/shared/types/subTypes"


const signUpWithGoogle = async (
    user: SignUpWithGoogleRequest
): Promise<boolean> => {
    const response = await fetch('/api/auth/sign-up/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })

    if (!response.ok) console.error("Failed to create user")
    return response.ok
}
export default signUpWithGoogle