import { createContext, useContext } from 'react'

// interface ArticleData {
//     id: string
//     blocks: BlockInterface[]
// }

export type BlockInterface =
    | ParagraphInterface
    | HeaderInterface
    | ListInterface
    | OrderedListInterface
    | ImageInterface
    | QuoteInterface
    | YoutubeEmbedInterface
    | LinksInterface
    | EmbeddedLinksInterface

export interface ParagraphInterface {
    id: string
    type: 'paragraph'
    data: {
        text: string
    }
}

export interface HeaderInterface {
    id: string
    type: 'header'
    data: {
        text: string
        level: 1 | 2 | 3 | 4
    }
}

export interface ListInterface {
    id: string
    type: 'list'
    data: {
        items: {
            id: string
            text: string
        }[]
    }
}

export interface OrderedListInterface {
    id: string
    type: 'ordered-list'
    data: {
        items: {
            id: string
            text: string
        }[]
    }
}

export interface ImageInterface {
    id: string
    type: 'image'
    data: {
        url: string | null
        alt: {
            id: string
            text: string
        }
        caption: {
            id: string
            text: string
        }
        stretched: boolean
    }
}

export interface QuoteInterface {
    id: string
    type: 'quote'
    data: {
        content: {
            id: string
            text: string
        }
        caption: {
            id: string
            text: string
        }
    }
}

export interface YoutubeEmbedInterface {
    id: string
    type: 'youtube-embed'
    data: {
        url: string | null
    }
}

export interface LinksInterface {
    id: string
    type: 'links'
    data: {
        items: {
            id: string
            text: {
                id: string
                text: string
            }
            url: {
                id: string
                text: string
            }
        }[]
    }
}

export interface EmbeddedLinksInterface {
    id: string
    type: 'embedded-links'
    data: {
        items: {
            id: string
            url: string
        }[]
    }
}

interface EditorContextType {
    data: BlockInterface[]
    setData: (data: BlockInterface[]) => void
    focusPreviousBlock: (id: string) => void
    focusNextBlock: (id: string) => void
    focusedId: string | undefined
    setFocusedId: (id: string) => void
    deleteBlock: (id: string) => void
}

export const EditorContext = createContext<EditorContextType | undefined>(undefined)

export const useEditor = () => {
    const context = useContext(EditorContext)
    if (!context) {
        throw new Error('No Context')
    }
    return context
}
