import { SignInWithEmailRequest } from "@/modules/shared/types/subTypes"

const singInWithEmail = async (signInWithEmailRequest: SignInWithEmailRequest) => {
    return fetch(`/api/auth/sign-in/email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signInWithEmailRequest),
    })
}
export default singInWithEmail