/*     // Job
    const [jobTitle, setJobTitle] = useState<string | undefined>(undefined)
    const [experience, setExperience] = useState<number | undefined>(0)
    const [isClinicPsychologist, setIsClinicPsychologist] = useState<boolean | undefined>(
        undefined,
    ) */

import { create } from 'zustand'

export interface JobStore {
    jobTitle: string | undefined
    experience: number | undefined
    isClinicPsychologist: boolean | undefined
    setJobTitle: (newJobTitle: string | undefined) => void
    setExperience: (newExperience: number | undefined) => void
    setIsClinicPsychologist: (newClinicPsychologist: boolean | undefined) => void
}

export const useJobStore = create<JobStore>((set) => ({
    jobTitle: undefined,
    experience: undefined,
    isClinicPsychologist: undefined,
    setJobTitle: (newJobTitle) => set({ jobTitle: newJobTitle }),
    setExperience: (newExperience) => set({ experience: newExperience }),
    setIsClinicPsychologist: (newClinicPsychologist) =>
        set({ isClinicPsychologist: newClinicPsychologist }),
}))
