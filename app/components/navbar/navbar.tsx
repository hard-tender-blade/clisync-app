import Content from './content'
import { Language } from '@/modules/client/languageInterface/language'

export default function NavbarPublic({ lang }: { lang: Language }) {
    return (
        <div>
            <Content lang={lang} />
        </div>
    )
}
