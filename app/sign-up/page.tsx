import React from 'react'
import Content from './content'
import languageInterface from '@/modules/client/languageInterface/language'

export default function Page() {
    const lang = languageInterface.defaultLanguage
    return (
        <div>
            <Content lang={lang} />
        </div>
    )
}
