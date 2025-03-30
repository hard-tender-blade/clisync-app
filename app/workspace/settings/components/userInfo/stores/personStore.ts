import { create } from 'zustand'

export interface PersonStore {
    mail: string
    name: string | undefined
    phoneNumber: string | undefined
    setMail: (newMail: string) => void
    setName: (newName: string | undefined) => void
    setPhoneNumer: (newNumber: string | undefined) => void
}

export const usePersonStore = create<PersonStore>((set) => ({
    mail: '',
    name: undefined,
    phoneNumber: undefined,
    setMail: (newMail) => set({ mail: newMail }),
    setName: (newName) => set({ name: newName }),
    setPhoneNumer: (newNumber) => set({ phoneNumber: newNumber }),
}))
