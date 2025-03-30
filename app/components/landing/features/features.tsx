import languageInterface, { Language } from '@/modules/client/languageInterface/language'
import React from 'react'

export default function Features({ lang }: { lang: Language }) {
    const LI = languageInterface.interfaces.landing[lang]

    return (
        <section className="flex w-11/12 flex-col justify-between gap-10  py-48 md:flex-row md:gap-0">
            {LI.weOffer.features.map((feature, index) => {
                return (
                    <div key={index} className="flex flex-col gap-4">
                        <div className="flex">
                            <div className="p-1 text-primary">{feature.icon}</div>

                            <h3 className="h3 p-1">{feature.title}</h3>
                        </div>
                        <p className="p px-12">{feature.text}</p>
                    </div>
                )
            })}
        </section>
    )
}
