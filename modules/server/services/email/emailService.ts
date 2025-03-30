import resend from "./resend";

const send = async ({
    from,
    to,
    subject,
    template,
    tags,
}: {
    from: string
    to: string[]
    subject: string
    template: React.ReactNode
    tags?: {
        name: string //! only letters, numbers, and underscores
        value: string //! only letters, numbers, and underscores
    }[]
}) => {
    const { data, error } = await resend.emails.send({
        from,
        to,
        subject,
        react: template,
        tags,
    });

    if (!data || error) return null
    return data.id
}

const emailService = {
    send,
}

export default emailService