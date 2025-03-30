import { AiFillHome } from 'react-icons/ai'
import { FaAddressBook, FaCalendarAlt, FaQuestion } from 'react-icons/fa'
import { IoSettingsSharp } from 'react-icons/io5'

export const workspacePagesMobile = [
    {
        icon: <AiFillHome />,
        path: '/workspace',
        label: 'Home',
    },
    {
        icon: <FaCalendarAlt />,
        path: '/workspace/calendar/month',
        label: 'Calendar',
    },
    {
        icon: <FaAddressBook />,
        path: '/workspace/clients',
        label: 'My clients',
    },
    {
        icon: <IoSettingsSharp />,
        path: '/workspace/settings',
        label: 'Settings',
    },
]

export const workspacePagesTop = [
    {
        icon: <AiFillHome />,
        path: '/workspace',
        label: 'Home',
    },
    {
        icon: <FaCalendarAlt />,
        path: '/workspace/calendar/month',
        label: 'Calendar',
    },
    {
        icon: <FaAddressBook />,
        path: '/workspace/clients',
        label: 'My clients',
    },
]

export const workspacePagesBottom = [
    {
        icon: <FaQuestion />,
        path: '/faq',
        label: 'FAQ',
    },
    {
        icon: <IoSettingsSharp />,
        path: '/workspace/settings',
        label: 'Settings',
    },
]
