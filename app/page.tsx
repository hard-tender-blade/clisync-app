'use client'

import languageInterface from '@/modules/client/languageInterface/language'
import NavbarPublic from './components/navbar/navbar'
import Hero from './components/landing/hero/hero'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/modules/client/queryClient'
import Link from 'next/link'
import Features from './components/landing/features/features'
import Pricing from './components/landing/pricing/pricing'
import Reviews from './components/landing/reviews/reviews'
import Video from './components/landing/video/video'
import Cards from './components/landing/cards/cards'

export default function Home() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex w-full flex-col items-center justify-center px-10 md:px-20">
                <NavbarPublic lang={languageInterface.defaultLanguage} />
                <Hero lang={languageInterface.defaultLanguage} />
                <div className="flex justify-center pb-12">
                    <Link href="/psychologists" className="btn btn-primary">
                        See all available psychologists
                    </Link>
                </div>
                <Cards lang={languageInterface.defaultLanguage} />
                <Features lang={languageInterface.defaultLanguage} />
                <Video lang={languageInterface.defaultLanguage} />
                <Reviews lang={languageInterface.defaultLanguage} />
                <Pricing lang={languageInterface.defaultLanguage} />
            </div>
        </QueryClientProvider>
    )
}
