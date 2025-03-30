import { Language } from "@/modules/client/languageInterface/language"
import { QuickNote } from "./mainTypes"


export interface SignUpWithEmailRequest {
    email: string
    password: string
    lang: Language
}

export interface SignUpWithGoogleRequest {
    accessToken: string
    refreshToken: string
    name: string
    lang: Language
}

export interface SignInWithEmailRequest {
    email: string
    password: string
    twoFACode?: string
}

export interface SignInWithGoogleRequest {
    accessToken: string
}

export interface GoogleAuthResponse {
    tokens: {
        access_token: string,
        refresh_token: string,
        scope: string,
        token_type: string,
        id_token: string,
        expiry_date: string
    },
    user: {
        id: string,
        email: string,
        verified_email: true,
        name: string,
        given_name: string,
        family_name: string,
        picture: string,
    }
}

export interface CreateClientRequest {
    name: string
    email?: string
    phoneNumber?: string
    age?: number
    note?: string
}

export interface UpdateClientRequest {
    name: string
    email?: string
    phoneNumber?: string
    age?: number
    note?: string
    quickNotes: QuickNote[]
}

export interface CreateSessionRequest {
    note: string
    start: string
    end: string
    timeZone: string
    clientId: string
    addToUserGoogleCalendar: boolean
    inviteClientOnGoogleCalendarEvent: boolean
}
