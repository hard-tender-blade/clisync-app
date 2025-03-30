import logOut from '@/modules/client/query/auth/logOut'
import languageInterface, { Language } from '@/modules/client/languageInterface/language'
import Link from 'next/link'
import React from 'react'
import { IoLogOut, IoPerson } from 'react-icons/io5'
import { IoMdFlower, IoMdPerson } from 'react-icons/io'
import PC from '../pc'
import PX from '../px'
import MOB from '../mob'
import { AiFillHome } from 'react-icons/ai'
import { queryClient } from '@/modules/client/queryClient'
import { useUser } from '@/modules/client/query/user/useUser'

export default function Content({ lang }: { lang: Language }) {
    const LI = languageInterface.interfaces.navbar[lang]

    const { user, isLoading: isLoadingUser } = useUser()

    const logOutHandler = async (): Promise<any> => {
        await logOut()
        queryClient.invalidateQueries()
        window.location.reload()
    }

    return (
        <>
            <PC className="fixed left-0 top-4 z-[200]  w-full">
                <PX>
                    <div className="rounded-full bg-white bg-opacity-60 p-2 px-3 shadow-custom backdrop-blur">
                        <div className="flex h-14 items-center justify-between ">
                            {/* left */}
                            <a className="btn btn-ghost rounded-full text-xl">
                                <IoMdFlower />
                                CliSync
                            </a>

                            {/* right */}
                            <div>
                                <div className="flex items-center gap-1">
                                    {isLoadingUser && (
                                        <span className="loading loading-spinner loading-sm mr-4"></span>
                                    )}
                                    {!user && (
                                        <div className="flex gap-1">
                                            <Link
                                                href="/sign-up"
                                                className="btn rounded-full"
                                            >
                                                {LI.signUp}
                                            </Link>
                                            <Link
                                                href="/sign-in"
                                                className="btn btn-primary rounded-full"
                                            >
                                                {LI.signIn}
                                            </Link>
                                        </div>
                                    )}
                                    {user && (
                                        <>
                                            <Link
                                                href="/workspace"
                                                tabIndex={0}
                                                role="button"
                                                className="btn btn-primary rounded-full"
                                            >
                                                <AiFillHome />
                                                {LI.goToWorkspaces}
                                            </Link>
                                            <div className="dropdown dropdown-end">
                                                <div
                                                    tabIndex={0}
                                                    role="button"
                                                    className="btn m-1 rounded-full"
                                                >
                                                    <IoMdPerson />
                                                    <span>{user.email}</span>
                                                </div>
                                                <ul
                                                    tabIndex={0}
                                                    className="menu dropdown-content z-[1] mt-1 w-52 rounded-box bg-base-100 p-2 shadow"
                                                >
                                                    <li>
                                                        <Link href={'/settings'}>
                                                            <IoPerson className="w-5" />
                                                            <span>
                                                                {LI.profile.myProfile}
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <button onClick={logOutHandler}>
                                                            <IoLogOut className="w-5" />
                                                            <span>
                                                                {LI.profile.logOut}
                                                            </span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </PX>
            </PC>

            <MOB className="fixed left-0 top-4 z-[200] w-full">
                <PX className="px-4">
                    <div className=" rounded-full bg-white bg-opacity-60 p-1 px-2 shadow-custom backdrop-blur">
                        <div className="flex h-14 items-center justify-between ">
                            {/* left */}
                            <a className="btn btn-ghost rounded-full text-xl">
                                <IoMdFlower />
                                CliSync
                            </a>

                            {/* right */}
                            <div>
                                <div className="flex items-center gap-1">
                                    {user === null && (
                                        <div className="flex gap-1">
                                            <Link
                                                href="/sign-in"
                                                className="btn btn-primary rounded-full"
                                            >
                                                {LI.signIn}
                                            </Link>
                                        </div>
                                    )}

                                    {user && (
                                        <>
                                            <Link
                                                href="/workspace"
                                                tabIndex={0}
                                                role="button"
                                                className="btn btn-primary rounded-full"
                                            >
                                                <AiFillHome />
                                            </Link>
                                            <div className="dropdown dropdown-end">
                                                <div
                                                    tabIndex={0}
                                                    role="button"
                                                    className="btn btn-primary m-1 rounded-full"
                                                >
                                                    <IoPerson />
                                                </div>
                                                <ul
                                                    tabIndex={0}
                                                    className="menu dropdown-content z-[1] mt-1 w-52 rounded-box bg-base-100 p-2 shadow"
                                                >
                                                    <li>
                                                        <Link href={'/profile'}>
                                                            <IoPerson className="w-5" />
                                                            <span>
                                                                {LI.profile.myProfile}
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <button onClick={logOutHandler}>
                                                            <IoLogOut className="w-5" />
                                                            <span>
                                                                {LI.profile.logOut}
                                                            </span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </PX>
            </MOB>
        </>
    )
}
