import React from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

export default function ThemeSwitch() {
    const [theme, setTheme] = React.useState<'light' | 'dark'>(
        (document.getElementById('theme')?.getAttribute('data-theme') as
            | 'light'
            | 'dark'
            | undefined) || 'light',
    )

    return (
        <label className="btn swap swap-rotate">
            <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={(e) => {
                    const themeDiv = document.getElementById('theme')
                    if (themeDiv) {
                        if (e.target.checked) {
                            //set to cookie
                            const expires = new Date(
                                new Date().getTime() + 1000 * 60 * 60 * 24 * 365,
                            ).toUTCString()
                            document.cookie = `theme=dark; expires=${expires}; path=/`
                            themeDiv.setAttribute('data-theme', 'dark')
                            setTheme('dark')
                        } else {
                            //set to cookie
                            const expires = new Date(
                                new Date().getTime() + 1000 * 60 * 60 * 24 * 365,
                            ).toUTCString()
                            document.cookie = `theme=light; expires=${expires}; path=/`
                            themeDiv.setAttribute('data-theme', 'light')
                            setTheme('light')
                        }
                    }
                }}
            />
            {/* sun icon */}
            <MdLightMode className="swap-on fill-current" />
            {/* moon icon */}
            <MdDarkMode className="swap-off fill-current" />
        </label>
    )
}
