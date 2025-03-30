import { Client } from "./mainTypes"

export interface Cursor {
    limit: number
    offset: number
}

export interface ClientsCursored {
    data: Client[]
    nextCursor: Cursor | null
}