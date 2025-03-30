'use client'
import GoogleButton from '@/app/sign-up/components/googleButton'
import { createE2EEKeyAndStoreInLocalStorage } from '@/modules/client/e2ee'
import languageInterface, { Language } from '@/modules/client/languageInterface/language'
import getUserDataFromGoogleAuthCodeFlow from '@/modules/client/query/auth/getUserDataFromGoogleSignUpPage'
import signUpWithEmail from '@/modules/client/query/auth/singUpWithEmail'
import signUpWithGoogle from '@/modules/client/query/auth/singUpWithGoogle'
import { showAlert } from '@/modules/client/utils/alert/alerts'
import { hideLoading, showLoading } from '@/modules/client/utils/loading/loadingModule'
import publicConfig from '@/modules/shared/config/publicConfig'
import { validateEmail, validatePassword } from '@/modules/shared/validation/validation'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useState } from 'react'
import { IoMdFlower } from 'react-icons/io'
import { MdOutlineMarkEmailUnread } from 'react-icons/md'
import PC from '../components/pc'
import PX from '../components/px'
import Separator from '../components/separator'

const Element = ({ lang }: { lang: Language }) => {
    const [LI, setLI] = useState(languageInterface.interfaces.signUp[lang])


    const [isEmailSent, setIsEmailSent] = useState(false)
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const [showE2EEQuestion, setShowE2EEQuestion] = useState(false)
    const [e2eeAnswer, setE2EEAnswer] = useState("")

    const handleSignUpWithEmailAndPassword = async () => {
        if (e2eeAnswer !== "") {
            await createE2EEKeyAndStoreInLocalStorage(e2eeAnswer)
        }

        if (password1 !== password2) {
            showAlert('error', 'short', LI.root.errors.passwordsNotMatch)
            return
        }

        if (!validatePassword(password1)) {
            showAlert('error', 'short', LI.root.errors.weekPassword)
        }

        if (!validateEmail(email)) {
            showAlert('error', 'short', LI.root.errors.invalidEmail)
            return
        }

        showLoading()
        const ok = await signUpWithEmail({
            email,
            password: password1,
            lang,
        })
        if (!ok) {
            showAlert('error', 'short', LI.root.errors.failedToSignUp)
            hideLoading()
            return
        }
        setIsEmailSent(true)
        showAlert('success', 'short', 'Verification email sent, check your inbox!')
        hideLoading()
    }

    const handleSignUpWithGoogle = async (code: string) => {
        if (e2eeAnswer !== "") {
            await createE2EEKeyAndStoreInLocalStorage(e2eeAnswer)
        }
        showLoading()
        const data = await getUserDataFromGoogleAuthCodeFlow(code)
        if (!data) {
            showAlert(
                'error',
                'short',
                'Failed to authenticate with Google, contact support please',
            )
            hideLoading()
            return
        }

        const ok = await signUpWithGoogle({
            accessToken: data.tokens.access_token,
            refreshToken: data.tokens.refresh_token,
            lang: lang,
            name: data.user.name,
        })
        if (!ok) {
            showAlert('error', 'short', LI.root.errors.failedToSignUp)
            hideLoading()
            return
        }

        window.location.href = '/'
        hideLoading()
    }

    return (
        <div className="flex h-screen w-screen">
            <PC className="h-full w-7/12 bg-primary" />

            <div className="w-full md:w-5/12">
                <PX>
                    {isEmailSent ? (
                        <>
                            <Separator size="sm" />
                            <Link
                                href="/"
                                className="btn btn-ghost ml-1 flex justify-center rounded-full text-xl"
                            >
                                <IoMdFlower />
                                CliSync
                            </Link>
                            <Separator size="sm" />
                            <MdOutlineMarkEmailUnread className="h-16 w-16" />
                            <h3 className="whitespace-nowrap text-3xl font-bold">
                                Check your inbox!
                            </h3>
                            <p className="pb-40">
                                {`If you didn't receive the email, `}
                                <strong className="font-bold">
                                    please check your spam folder.
                                </strong>
                            </p>
                        </>
                    ) : (
                        <div className="flex flex-col">
                            <Separator size="sm" />
                            <Link
                                href="/"
                                className="btn btn-ghost ml-1 flex justify-center rounded-full text-xl"
                            >
                                <IoMdFlower />
                                CliSync
                            </Link>
                            <Separator size="sm" />
                            <div className="flex items-center justify-between">
                                <h3 className="whitespace-nowrap text-3xl font-bold">
                                    {LI.root.title}
                                </h3>
                            </div>
                            <label className="form-control mt-4 w-full">
                                <div className="label">
                                    <span className="label-text">{LI.root.email}</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input input-bordered w-full"
                                    id="email-input"
                                    autoComplete="email"
                                />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">{LI.root.password}</span>
                                </div>
                                <input
                                    type="password"
                                    placeholder={LI.root.password}
                                    value={password1}
                                    onChange={(e) => setPassword1(e.target.value)}
                                    className="input input-bordered w-full"
                                    id="password-input"
                                    autoComplete="current-password"
                                />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">
                                        {LI.root.repeatPassword}
                                    </span>
                                </div>
                                <input
                                    type="password"
                                    placeholder={LI.root.repeatPassword}
                                    value={password2}
                                    onChange={(e) => setPassword2(e.target.value)}
                                    className="input input-bordered w-full"
                                    id="password2-input"
                                    autoComplete="current-password"
                                />
                            </label>

                            <label id="e2ee-container" className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">First love name (e2ee)</span>
                                </div>
                                <input
                                    type="text"
                                    value={e2eeAnswer}
                                    onChange={(e) => setE2EEAnswer(e.target.value)}
                                    className="input input-bordered w-full"
                                    id="e2ee-input"
                                />
                            </label>

                            <button
                                className="btn btn-primary mt-6"
                                onClick={handleSignUpWithEmailAndPassword}
                            >
                                {LI.root.create}
                            </button>

                            {/* <GoogleOAuthProvider */}
                            {/*     clientId={publicConfig.next_public_google_client_id} */}
                            {/* > */}
                            {/*     <GoogleButton */}
                            {/*         title={'Sign up with Google'} */}
                            {/*         callBack={handleSignUpWithGoogle} */}
                            {/*     /> */}
                            {/* </GoogleOAuthProvider> */}

                            <div className="divider text-sm uppercase">{LI.root.or}</div>

                            <Link href="/sign-in" className="btn">
                                {LI.root.alreadyHaveAcc}
                            </Link>
                        </div>
                    )}
                </PX>
            </div>
        </div>
    )
}

export default function Content({ lang }: { lang: Language }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Element lang={lang} />
        </Suspense>
    )
}
