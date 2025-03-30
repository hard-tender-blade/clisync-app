interface SignIn {
    title: string
    email: string
    password: string
    submit: string
    createNewAcc: string
    or: string
    sessionExpired: string
    errors: {
        failedToSignIn: string
        invalidEmail: string
        weekPassword: string
    }
}

const signIn: {
    en: SignIn
} = {
    en: {
        title: 'Sign in',
        email: 'Email',
        password: 'Password',
        submit: 'Submit',
        createNewAcc: 'Create new account',
        or: 'or',
        sessionExpired:
            'Your session expired due to security measures. Thank you for your understanding!',
        errors: {
            failedToSignIn: 'Invalid credentials',
            invalidEmail: 'Invalid email',
            weekPassword:
                'Password should contain at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol',
        },
    },
}

export default signIn
