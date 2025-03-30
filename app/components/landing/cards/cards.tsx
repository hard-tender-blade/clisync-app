'use client'
import languageInterface, { Language } from '@/modules/client/languageInterface/language'
import React from 'react'
import Card from './card'

export default function Cards({ lang }: { lang: Language }) {
    const LI = languageInterface.interfaces.landing[lang]
    const cards = LI.weOffer.cards

    return (
        <section className="flex w-11/12 flex-col  gap-4  rounded-2xl  md:bg-background_gray md:p-10">
            <h1 className="h2"> {LI.weOffer.title}</h1>
            <div className="flex w-full flex-col md:flex-row">
                <div className=" flex flex-col items-center justify-center md:w-1/2">
                    <Card
                        number={cards[0].number}
                        title={cards[0].title}
                        text={cards[0].text}
                        index={0}
                    />
                    <Card
                        number={cards[1].number}
                        title={cards[1].title}
                        text={cards[1].text}
                        index={1}
                    />
                    <div className=" hidden h-28 md:flex"></div>
                </div>
                <div className=" flex flex-col items-center justify-center md:w-1/2">
                    <div className=" hidden h-28 md:flex"> </div>
                    <Card
                        number={cards[2].number}
                        title={cards[2].title}
                        text={cards[2].text}
                        index={2}
                    />
                    <Card
                        number={cards[3].number}
                        title={cards[3].title}
                        text={cards[3].text}
                        index={3}
                    />
                </div>
            </div>
        </section>
    )
}
