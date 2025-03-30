import { useState } from 'react'
import ConnectGoogleCalendarButton from './components/ConnectGoogleCalendar'
import TwoFA from './components/twoFA'
import UserInfo from './components/userInfo/userInfo'

export default function Content() {
    const [menuPosition, setMenuPosition] = useState('absolute top-28')

    const [selectedPage, setSelectedPage] = useState<
        'user-info' | 'connect-google-calendar' | '2fa'
    >('user-info')

    return (
        <div className="overflow-hidden">
            <div className="flex w-full flex-col items-center justify-center">
                <div className="flex h-28 w-full flex-row items-center justify-start border-b-2 border-b-border_gray bg-gray marker:h-28">
                    <div className="ml-[15%] flex h-full items-center justify-start">
                        <h3 className="flex">Settings</h3>
                    </div>
                </div>
            </div>
            <ul className={`${menuPosition} menu ml-[15%] w-56 pl-0`}>
                <li>
                    <a
                        onClick={() => {
                            setSelectedPage('user-info')
                        }}
                        className={`${selectedPage == 'user-info' ? 'font-bold' : ''}`}
                    >
                        User Info
                    </a>
                </li>
                <li>
                    <a
                        onClick={() => {
                            setSelectedPage('connect-google-calendar')
                        }}
                        className={`${selectedPage == 'connect-google-calendar' ? 'font-bold' : ''}`}
                    >
                        Google Calendar
                    </a>
                </li>
                <li>
                    <a
                        onClick={() => {
                            setSelectedPage('2fa')
                        }}
                        className={`${selectedPage == '2fa' ? 'font-bold' : ''}`}
                    >
                        2FA
                    </a>
                </li>
            </ul>
            <div className="ml-[15%] mr-[15%] flex flex-row">
                <div className="ml-56 w-full pl-4 pt-3">
                    {selectedPage === 'user-info' && <UserInfo />}
                    {selectedPage === 'connect-google-calendar' && (
                        <ConnectGoogleCalendarButton />
                    )}
                    {selectedPage === '2fa' && <TwoFA />}
                </div>
            </div>
        </div>
    )
}
