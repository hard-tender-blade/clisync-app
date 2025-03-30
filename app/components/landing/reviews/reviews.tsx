'use client'
import languageInterface, { Language } from '@/modules/client/languageInterface/language'
import React, { useState } from 'react'
import { IoPersonCircleOutline } from 'react-icons/io5'

export default function Reviews({ lang }: { lang: Language }) {
    const LI = languageInterface.interfaces.landing[lang]

    const [selecedReview, setSelectedReview] = useState(LI.reviews.reviews[0])

    const handleReviewChange = (index: number) => {
        setSelectedReview(LI.reviews.reviews[index])
        console.log(selecedReview)
    }

    const reviews = LI.reviews
    return (
        <section className="mt-40 flex w-11/12 flex-col gap-4  rounded-2xl bg-background_gray p-8 md:h-[80vh] md:p-20">
            <h1 className="h2">{reviews.title}</h1>
            <div className=" flex flex-col md:mt-16  md:flex-row ">
                <div className="flex flex-col justify-evenly gap-3 md:w-1/3 md:gap-6">
                    {LI.reviews.reviews.map((review, index) => {
                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    handleReviewChange(index)
                                }}
                                className={` flex w-full items-center gap-4 rounded-2xl p-2 text-xl md:p-4 md:text-2xl ${review.name === selecedReview.name ? 'bg-white' : ''}`}
                            >
                                <IoPersonCircleOutline className=" text-2xl md:text-4xl" />

                                <div className="flex flex-col">
                                    <p className="p-bold w-fit">{review.name}</p>
                                    <p className="w-fit text-xs font-extralight text-[#B2B2B2] md:text-sm">
                                        {review.profesion}
                                    </p>
                                </div>
                            </button>
                        )
                    })}
                </div>
                <div className="flex flex-col gap-2 p-4 md:w-2/3 md:p-10">
                    <p className="p-bold ">{selecedReview.title}</p>
                    <div>
                        {Array(selecedReview.stars)
                            .fill(null)
                            .map((_, index) => (
                                <span key={index} className="text-md md:text-xl">
                                    ⭐
                                </span>
                            ))}
                    </div>
                    <p className="p pt-3 md:pt-6">{selecedReview.text}</p>
                </div>
            </div>
        </section>
    )
}
