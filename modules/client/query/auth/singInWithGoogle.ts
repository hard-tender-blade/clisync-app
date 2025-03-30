import { SignInWithGoogleRequest } from "@/modules/shared/types/subTypes"

const singInWithGoogle = async (signInWithGoogleRequest: SignInWithGoogleRequest): Promise<boolean> => {
    const response = await fetch(`/api/auth/sign-in/google`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signInWithGoogleRequest),
    })

    if (!response.ok) console.error("Failed to login user")
    return response.ok
}
export default singInWithGoogle