import { Language } from '@/modules/client/languageInterface/language'
import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Text,
} from '@react-email/components'
import * as React from 'react'

const AccountVerificationEmailTemplateHtml = ({ magicUrl }: { magicUrl: string }) => (
    <Html>
        <Head />
        <Preview>Log in with this magic link</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Verify your account</Heading>
                <Link
                    href={magicUrl}
                    target="_blank"
                    style={{
                        ...link,
                        display: 'block',
                        marginBottom: '16px',
                    }}
                >
                    Click here to log in with this magic link
                </Link>
                <Text
                    style={{
                        ...text,
                        color: '#ababab',
                        marginTop: '14px',
                        marginBottom: '16px',
                    }}
                >
                    If you didn&apos;t try to login, you can safely ignore this email.
                </Text>

                {/* //todo replace this with clisync image */}
                {/* <Img
                    src={`${baseUrl}/static/notion-logo.png`}
                    width="32"
                    height="32"
                    alt="Notion's Logo"
                /> */}
                <Text style={footer}>
                    <Link
                        href="https://clisync.com"
                        target="_blank"
                        style={{ ...link, color: '#898989' }}
                    >
                        CliSync
                    </Link>
                    , all you need as therapist in one place.
                </Text>
            </Container>
        </Body>
    </Html>
)

const main = {
    backgroundColor: '#ffffff',
}

const container = {
    paddingLeft: '0px',
    paddingRight: '12px',
    margin: '0 auto',
}

const h1 = {
    color: '#333',
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '40px 0',
    padding: '0',
}

const link = {
    color: '#2754C5',
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    textDecoration: 'underline',
}

const text = {
    color: '#333',
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    margin: '24px 0',
}

const footer = {
    color: '#898989',
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '12px',
    lineHeight: '22px',
    marginTop: '12px',
    marginBottom: '24px',
}

//todo land support and in tags (func bellow)
const emailSubject = () => 'Verify your account'

const tags = ({
    userId,
    lang,
}: {
    userId: string
    lang: Language
}): {
    name: string
    value: string
}[] => {
    return [
        { name: 'type', value: 'account_verification' },
        { name: 'userId', value: userId },
        { name: 'lang', value: lang },
    ]
}

const accountVerificationEmailTemplate = {
    html: AccountVerificationEmailTemplateHtml,
    from: 'CliSync <verification@clisync.com>',
    subject: emailSubject,
    tags,
}
export default accountVerificationEmailTemplate
