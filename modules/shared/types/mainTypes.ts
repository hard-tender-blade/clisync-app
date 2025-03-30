import { Language } from "@/modules/client/languageInterface/language"

//todo update user fields
export interface User {
    id: string
    email: string
    lang: Language
    googleCalendarConnected: boolean
    googleAuth: boolean

    //Nullable fields
    experience?: number
    inPersonService?: boolean
    isClinicPsychologist?: boolean
    jobTitle?: string
    city?: string
    name?: string
    country?: string
    address?: string
    postalCode?: string
    aboutMe?: string
    onlineService?: boolean
    phoneNumber?: string
    status?: string
    website?: string
    isPubliclyListed: boolean
    premiumPlanTo: Date | string | null
    twoFAEnabled: boolean
    twoFASecret: string | null
}

export interface Client {
    id: string
    name: string
    email?: string
    phoneNumber?: string
    age?: number
    note?: string
    quickNotes: QuickNote[]
    sessions: Session[]
    userId: string
    clientAttachments: ClientAttachment[]
}

export interface ClientAttachment {
    id: string
    fileName: string
    clientId: string
    userId: string
    path: string
    size: number
    bucket: string
}

export interface SessionAttachment {
    id: string
    fileName: string
    sessionId: string
    userId: string
    path: string
    size: number
    bucket: string
}

export interface QuickNote {
    id: string
    note: string
    clientId: string
    userId: string
}

export interface Session {
    id: string
    start: Date | string
    end: Date | string
    googleEventId: string | null
    clientInvited: boolean | null
    note: string
    clientId: string
    userId: string
    sessionsAttachments: SessionAttachment[]
}

export interface SessionWithClient extends Session {
    client: Client
}

export interface Password {
    id: string
    userId: string
    password: string
    email: string
}
