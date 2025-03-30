import languageInterface, { Language } from '@/modules/client/languageInterface/language'
import React from 'react'

export default function Hero({ lang }: { lang: Language }) {
    const LI = languageInterface.interfaces.landing[lang]

    return (
        <section className="flex w-11/12 flex-col items-center justify-between py-28 md:flex-row">
            <img src="/hero.png" className="h-auto w-96" alt="" />
            <div className="flex  flex-col gap-12 md:w-7/12">
                <h1 className=" h1 font-extrabold ">{LI.hero.title}</h1>
                <p className="p">{LI.hero.subTitle}</p>
                <button className="btn btn-primary btn-lg rounded-full md:w-36 ">
                    {LI.hero.heroButton}
                </button>
            </div>
        </section>
    )
}
