import languageInterface, { Language } from '@/modules/client/languageInterface/language'
import React from 'react'

export default function Video({ lang }: { lang: Language }) {
    const LI = languageInterface.interfaces.landing[lang]
    return (
        <section className=" aspect-video w-11/12  md:pt-20">
            <iframe
                width="560"
                height="315"
                src={'https://www.youtube.com/embed/vo4pMVb0R6M?si=LV8UpgRVuzMFn7v1'}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
        </section>
    )
}
