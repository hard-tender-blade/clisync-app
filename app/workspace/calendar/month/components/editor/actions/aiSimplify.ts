'use server'

import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { createStreamableValue } from 'ai/rsc'

export async function aiSimplify(input: string) {
    const stream = createStreamableValue('')

    ;(async () => {
        const { textStream } = streamText({
            model: openai('gpt-4o-mini'),
            messages: [
                {
                    role: 'system',
                    content:
                        'You are a text simplifier. You will simplify and update the text given and make it more readable and simple. You will not adjust the meaning of the text.',
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
