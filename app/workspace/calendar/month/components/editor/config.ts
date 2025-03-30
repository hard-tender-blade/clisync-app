// DEPENDENCIES:
//  - firestore
//  - api to access the S3 bucket, /api/uploads
//  - api to make embedded links, /api/embedded-link (conditional if embedded links are enabled)

interface BlogConfigInterface {
    toolsConfig: {
        paragraph: boolean
        header1: boolean
        header2: boolean
        header3: boolean
        header4: boolean
        list: boolean
        orderedList: boolean
        image: boolean
        quote: boolean
        youtubeEmbed: boolean
        links: boolean
        embeddedLinks: boolean
    }
    aiToolsConfig: {
        simplify: boolean
        organize: boolean
    }

    liTools: {
        p: string
        h1: string
        h2: string
        h3: string
        h4: string
        list: string
        orderedList: string
        image: string
        quote: string
        youtubeEmbed: string
        links: string
        embeddedLinks: string
    }
    liAiTools: {
        simplify: string
        organize: string
    }
    li: {
        tools: {
            p: {
                placeholder: string
            }
            quote: {
                textPlaceholder: string
                captionPlaceholder: string
            }
            youtubeEmbed: {
                approve: string
                paste: string
            }
            image: {
                upload: string
                caption: {
                    placeholder: string
                    title: string
                    text: string
                    link: string
                }
                alt: {
                    placeholder: string
                    title: string
                    text: string
                    link: {
                        title: string
                        link: string
                    }
                }
            }
            header: {
                placeholder: string
            }
            listItem: {
                placeholder: string
            }
            orderedListItem: {
                placeholder: string
            }
            linksItem: {
                textPlaceholder: string
                urlPlaceholder: string
            }
            embeddedLinksItem: {
                urlPlaceholder: string
            }
        }
    }
}

const blogConfig: BlogConfigInterface = {
    toolsConfig: {
        paragraph: true,
        header1: false,
        header2: true,
        header3: true,
        header4: true,
        list: true,
        orderedList: true,
        image: true,
        quote: true,
        youtubeEmbed: true,
        links: true,
        embeddedLinks: true,
    },
    aiToolsConfig: {
        simplify: true,
        organize: true,
    },
    liTools: {
        p: 'P',
        h1: 'H1',
        h2: 'H2',
        h3: 'H3',
        h4: 'H4',
        list: 'List',
        orderedList: 'or. List',
        image: 'Image',
        quote: 'Quote',
        youtubeEmbed: 'Youtube video',
        links: 'Links',
        embeddedLinks: 'Emb. Links',
    },
    liAiTools: {
        simplify: 'Simplify',
        organize: 'Organize',
    },
    li: {
        tools: {
            p: {
                placeholder: 'Paragraph..',
            },
            quote: {
                textPlaceholder: 'Quote..',
                captionPlaceholder: 'Author..',
            },
            youtubeEmbed: {
                approve: 'Approve',
                paste: 'Paste the link below',
            },
            image: {
                upload: 'Click to upload | Drag and Drop',
                caption: {
                    placeholder: 'Caption..',
                    title: 'Caption',
                    text: 'The caption is a short description of the image. It is visible to users and can be used to provide additional context or information about the image.',
                    link: 'Read more about captions on the Claster blog.',
                },
                alt: {
                    placeholder: 'Alt attribute..',
                    title: 'Alt attribute',
                    text: 'The alt attribute provides alternative text for images, helping search engines like Google understand their content. Although it is not visible to users, it is crucial for SEO.',
                    link: {
                        title: 'Read more about the alt attribute on the Claster blog.',
                        link: 'https://claster.cz',
                    },
                },
            },
            header: {
                placeholder: 'Header..',
            },
            listItem: {
                placeholder: 'List item..',
            },
            orderedListItem: {
                placeholder: 'List item..',
            },
            linksItem: {
                textPlaceholder: 'Link text..',
                urlPlaceholder: 'Link..',
            },
            embeddedLinksItem: {
                urlPlaceholder: 'Link..',
            },
        },
    },
}

export default blogConfig
