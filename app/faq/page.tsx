'use client'

import languageInterface from '@/modules/client/languageInterface/language'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/modules/client/queryClient'
import NavbarPublic from '../components/navbar/navbar'
import Faq from './faq/faq'
import Separator from '../components/separator'

export default function Home() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex w-full flex-col items-center justify-center px-10 md:px-20">
                <NavbarPublic lang={languageInterface.defaultLanguage} />

                <Separator size="lg" />
                <Separator size="sm" />

                <Faq />

                <Separator size="sm" />
            </div>
        </QueryClientProvider>
    )
}
