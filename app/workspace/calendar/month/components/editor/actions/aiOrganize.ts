'use server'

import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { createStreamableValue } from 'ai/rsc'

export async function aiOrganize(input: string) {
    const stream = createStreamableValue('')

    ;(async () => {
        const { textStream } = streamText({
            model: openai('gpt-4o-mini'),
            messages: [
                {
                    role: 'system',
                    content:
                        'You are a text organizer. You will organize and update the text given and make it more readable and organized. You will arrange the text into paragraphs if possible. You will not adjust the meaning of the text.',
                },
                {
                    role: 'user',
                    content: input,
                },
            ],
        })

        for await (const delta of textStream) {
            stream.update(delta)
        }

        stream.done()
    })()

    return { output: stream.value }
}
