import React from 'react'

interface Props {
    number: string
    title: string
    text: string[]
    index: number
}
export default function Card(card: Props) {
    return (
        <div className="m-10 flex  w-11/12  flex-col gap-8 rounded-[3rem] border-2 border-base-200 bg-white p-8 first:bg-primary first:text-white md:border-0 ">
            <p className="h2 w-full p-4 pr-2 text-right">{card.number}</p>
            <h3 className="h3 w-10/12 md:w-8/12">{card.title}</h3>
            {card.text.map((text, i) => (
                <p
                    key={i}
                    className={`p ${card.index === 0 ? 'text-white' : ''} md:w-10/12`}
                >
                    {text}
                </p>
            ))}{' '}
        </div>
    )
}
