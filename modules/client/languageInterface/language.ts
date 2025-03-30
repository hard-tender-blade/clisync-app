import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'
import navbar from './interfaces/navbar'
import signIn from './interfaces/signIn'
import signUp from './interfaces/signUp'
import landing from './interfaces/landing'

export enum Language {
    en = 'en',
}

class LanguageInterface {
    //Properties
    public readonly defaultLanguage = Language.en
    public readonly supportedLanguages = Object.values(Language)
    public readonly interfaces = {
        signIn,
        signUp,
        navbar,
        landing,
    }

    //Methods
    detectLanguageFromHeaders(headers: ReadonlyHeaders): Language {
        const acceptLanguage = headers.get('accept-language')
        if (!acceptLanguage) {
            return this.defaultLanguage
        }

        for (let i = 0; i < acceptLanguage.length - 1; i++) {
            const part = acceptLanguage.slice(i, i + 2)
            if (this.check(part)) return part
        }

        return this.defaultLanguage
    }

    check(language: string): language is Language {
        return Language.hasOwnProperty(language)
    }
}
const languageInterface = new LanguageInterface()
export default languageInterface
