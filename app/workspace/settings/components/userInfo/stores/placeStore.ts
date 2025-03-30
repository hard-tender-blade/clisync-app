/* 
    // Place
    const [country, setCountry] = useState<string | undefined>(undefined)
    const [city, setCity] = useState<string | undefined>(undefined)
    const [address, setAddress] = useState<string | undefined>(undefined)
    const [postalCode, setPostalCode] = useState<string | undefined>(undefined) */

import { create } from 'zustand'

export interface PersonStore {
    country: string | undefined
    city: string | undefined
    address: string | undefined
    postalCode: string | undefined
    setCountry: (newCountry: string | undefined) => void
    setCity: (newCity: string | undefined) => void
    setAddress: (newAddress: string | undefined) => void
    setPostalCode: (newPostalCode: string | undefined) => void
}

export const usePlaceStore = create<PersonStore>((set) => ({
    country: undefined,
    city: undefined,
    address: undefined,
    postalCode: undefined,
    setCountry: (newCountry) => set({ country: newCountry }),
    setCity: (newCity) => set({ city: newCity }),
    setAddress: (newAddress) => set({ address: newAddress }),
    setPostalCode: (newPostalCode) => set({ postalCode: newPostalCode }),
}))
