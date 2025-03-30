'use client'
import languageInterface, { Language } from '@/modules/client/languageInterface/language'
import singInWithEmail from '@/modules/client/query/auth/singInWithEmail'
import singInWithGoogle from '@/modules/client/query/auth/singInWithGoogle'
import { showAlert } from '@/modules/client/utils/alert/alerts'
import { hideLoading, showLoading } from '@/modules/client/utils/loading/loadingModule'
import publicConfig from '@/modules/shared/config/publicConfig'
import { validateEmail, validatePassword } from '@/modules/shared/validation/validation'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import { FaShieldHeart } from 'react-icons/fa6'
import { IoMdFlower } from 'react-icons/io'
import PC from '../components/pc'
import PX from '../components/px'
import Separator from '../components/separator'
import GoogleButton from './components/googleButton'
import { checkIfKeyExists, createE2EEKeyAndStoreInLocalStorage, decryptString, encryptString } from '@/modules/client/e2ee'

const Element = ({ lang }: { lang: Language }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showE2EEQuestion, setShowE2EEQuestion] = useState(false)
    const [e2eeAnswer, setE2EEAnswer] = useState("")

    const [twoFACode, setTwoFACode] = useState('')

    const router = useRouter()
    const searchParams = useSearchParams()

    const LI = languageInterface.interfaces.signIn[lang]

    useEffect(() => {
        const e = checkIfKeyExists()
        console.log("e", e)
        if (e) return
        setShowE2EEQuestion(true)
    })

    const handleSubmit = async () => {
        if (!validateEmail(email)) {
            showAlert('error', 'short', LI.errors.invalidEmail)
            return
        }
        if (!validatePassword(password)) {
            showAlert('error', 'short', LI.errors.weekPassword)
            return
        }
        if (e2eeAnswer !== "") {
            await createE2EEKeyAndStoreInLocalStorage(e2eeAnswer)
        }
        showLoading()
        const res = await singInWithEmail(
            twoFACode === '' ? { email, password } : { email, password, twoFACode },
        )
        if (!res.ok) {
            showAlert('error', 'short', 'Invalid credentials')
            setEmail('')
            setPassword('')
            hideLoading()
            return
        }

        const data = await res.json()

        // check if 2FA is enabled
        if (data.twoFARequired) {
            const el = document.getElementById('2fa-container')
            hideLoading()
            el.classList.remove('hidden')
            el.focus()
            return
        }

        const redirect = searchParams.get('redirect')
        if (redirect) {
            router.replace(redirect)
            hideLoading()
            return
        }
        window.location.href = '/'
        hideLoading()
        return
    }

    const handleSignInWithGoogle = async (accessToken: string) => {
        showLoading()
        const ok = await singInWithGoogle({ accessToken })
        if (!ok) {
            showAlert('error', 'short', LI.errors.failedToSignIn)
            hideLoading()
            return
        }

        const redirect = searchParams.get('redirect')
        if (redirect) {
            router.replace(redirect)
            hideLoading()
            return
        }
        window.location.href = '/'
        hideLoading()
        return
    }

    return (
        <div className="flex h-screen w-screen">
            <PC className="h-full w-7/12 bg-primary" />

            <div className="w-full md:w-5/12">
                <PX className="flex flex-col">
                    {searchParams.get('sessionExpired') ? (
                        <div>
                            <Separator size="md" />
                            <Link
                                href="/"
                                className="btn btn-ghost ml-1 flex justify-center rounded-full text-xl"
                            >
                                <IoMdFlower />
                                CliSync
                            </Link>
                            <div role="alert" className="alert flex text-left">
                                <FaShieldHeart className="h-10 w-10" />
                                <span className="text-xs">{LI.sessionExpired}</span>
                            </div>
                            <Separator size="sm" />
                        </div>
                    ) : (
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
                        </>
                    )}
                    <div className="flex items-center justify-between">
                        <h3 className="whitespace-nowrap text-3xl font-bold">
                            {LI.title}
                        </h3>
                    </div>
                    <label className="form-control mt-4 w-full">
                        <div className="label">
                            <span className="label-text">{LI.email}</span>
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
                            <span className="label-text">{LI.password}</span>
                        </div>
                        <input
                            type="password"
                            placeholder={LI.password}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full"
                            id="password-input"
                            autoComplete="current-password"
                        />
                    </label>

                    {
                        showE2EEQuestion && (
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
                        )
                    }

                    <label id="2fa-container" className="form-control hidden w-full">
                        <div className="label">
                            <span className="label-text">2FA</span>
                        </div>
                        <input
                            type="number"
                            placeholder={'xxx - xxx'}
                            value={twoFACode}
                            onChange={(e) => setTwoFACode(e.target.value)}
                            className="input input-bordered w-full"
                            id="2fa-input"
                        />
                    </label>

                    <button className="btn btn-primary mt-8" onClick={handleSubmit}>
                        {LI.submit}
                    </button>

                    {/* <GoogleOAuthProvider */}
                    {/*     clientId={publicConfig.next_public_google_client_id} */}
                    {/* > */}
                    {/*     <GoogleButton */}
                    {/*         title={'Sing in with Google'} */}
                    {/*         callBack={handleSignInWithGoogle} */}
                    {/*     /> */}
                    {/* </GoogleOAuthProvider> */}

                    <div className="divider text-sm uppercase">{LI.or}</div>

                    <Link href="/sign-up" className="btn">
                        {LI.createNewAcc}
                    </Link>
                </PX>
            </div>
        </div>
    )
}

export default function Content({ lang }: { lang: Language }) {
    return (
        <Suspense fallback={<></>}>
            <Element lang={lang} />
        </Suspense>
    )
}
