import { ReactNode } from 'react'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { FaAddressBook } from 'react-icons/fa6'
import { IoPersonAdd } from 'react-icons/io5'

interface Navbar {
    goToWorkspaces: string
    workspaceHover: WorkspaceHover[]
    signIn: string
    signUp: string
    profile: {
        myProfile: string
        logOut: string
    }
}

interface WorkspaceHover {
    icon: ReactNode

    name: string
    link: string
}
const navbar: {
    en: Navbar
} = {
    en: {
        goToWorkspaces: 'My Workspace',
        workspaceHover: [
            {
                icon: <FaRegCalendarAlt />,

                name: 'Calendar',
                link: '/workspace/calendar/month',
            },
            {
                icon: <FaAddressBook />,
                name: 'My Clients',
                link: '/workspace/clients',
            },
            {
                icon: <IoPersonAdd />,
                name: 'New Client',
                link: '/workspace/clients/new',
            },
        ],
        signIn: 'Sign in',
        signUp: 'Sign up',
        profile: {
            myProfile: 'My profile',
            logOut: 'Log out',
        },
    },
}

export default navbar
