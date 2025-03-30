import React from 'react'
import Content from './content'
import { headers } from 'next/headers'
import languageInterface from '@/modules/client/languageInterface/language'

export default function Page() {
    const lang = languageInterface.detectLanguageFromHeaders(headers())
    return (
        <div>
            <Content lang={lang} />
        </div>
    )
}
