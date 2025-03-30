import { create } from 'zustand'

export interface ServicesStore {
    onlineService: boolean | undefined
    isPersonService: boolean | undefined
    setOnlineService: (newOnlineService: boolean | undefined) => void
    setInPersonService: (newInPersonService: boolean | undefined) => void
}

export const useServicesStore = create<ServicesStore>((set) => ({
    onlineService: undefined,
    isPersonService: undefined,
    setOnlineService: (newOnlineService) => set({ onlineService: newOnlineService }),
    setInPersonService: (newInPersonService) =>
        set({ isPersonService: newInPersonService }),
}))
