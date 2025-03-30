/* const [aboutMe, setAboutMe] = useState<string | undefined>(undefined)
const [status, setStatus] = useState<string | undefined>(undefined)
const [website, setWebsite] = useState<string | undefined>(undefined) */

import { create } from 'zustand'

export interface PersonStore {
    aboutMe: string | undefined
    status: string | undefined
    website: string | undefined
    setAboutMe: (newAboutMe: string | undefined) => void
    setStatus: (newStatus: string | undefined) => void
    setWebsite: (newWebsite: string | undefined) => void
}

export const useAboutMeStore = create<PersonStore>((set) => ({
    aboutMe: undefined,
    status: undefined,
    website: undefined,
    setAboutMe: (newAboutMe) => set({ aboutMe: newAboutMe }),
    setStatus: (newStatus) => set({ status: newStatus }),
    setWebsite: (newWebsite) => set({ website: newWebsite }),
}))
