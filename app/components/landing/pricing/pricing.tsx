import languageInterface, { Language } from '@/modules/client/languageInterface/language'
import publicConfig from '@/modules/shared/config/publicConfig'
import axios from 'axios'
import React from 'react'

export default function Pricing({ lang }: { lang: Language }) {
    const LI = languageInterface.interfaces.landing[lang]
    const pricing = LI.pricing

    return (
        <section className="mb-10 mt-40 flex w-11/12 flex-col justify-evenly gap-10 rounded-2xl bg-background_gray p-4 md:flex-row md:p-20">
            {pricing.map((card, index) => {
                return (
                    <div
                        key={index}
                        className={`w-full md:w-[${100 / pricing.length}%] rounded-[2rem] bg-white p-10 pl-8 even:bg-[#1E1E1E] even:text-white`}
                        //style={{ width: `${100 / pricing.length}%` }}
                    >
                        <div className="flex flex-col gap-2">
                            <div className="btn btn-primary w-fit rounded-full md:text-lg">
                                {card.plan}
                            </div>
                            <p className="p-tiny text-[#BBB0B0]">{card.aboutPlan}</p>
                            <h1 className="h2 pt-8">{card.title}</h1>
                        </div>
                        <div
                            className={`m-4 ml-0 h-[1px] w-full rounded-full ${
                                index % 2 === 0 ? 'bg-[#F0F0F0]' : 'bg-[#4E4C4C]'
                            }`}
                        ></div>

                        <ul className="h-[40%]">
                            {card.features.map((feature, i) => (
                                <li className="ml-4 list-disc pb-2" key={i}>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <div className="mb-24">
                            {card.button && (
                                <button
                                    className="btn btn-primary  w-full"
                                    onClick={async () => {
                                        try {
                                            const result = await axios({
                                                method: 'get',
                                                url: `${publicConfig.next_public_origin}/api/user`,
                                            })
                                        } catch (error) {
                                            alert('Please login to continue')
                                            return
                                        }

                                        const response = await fetch(
                                            '/api/purchase/create-checkout-session',
                                            {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({
                                                    lookup_key: 'pro+',
                                                }),
                                            },
                                        )

                                        const data = await response.json()
                                        window.location.href = data.url
                                    }}
                                >
                                    {card.button}
                                </button>
                            )}
                        </div>
                    </div>
                )
            })}
        </section>
    )
}
