import { useUser } from '@/modules/client/query/user/useUser'
import { showAlert } from '@/modules/client/utils/alert/alerts'
import Loading from '@/modules/client/utils/loading/loading'
import { User } from '@/modules/shared/types/mainTypes'
import React, { useEffect } from 'react'
import AboutMeInfo from './components/AboutMeInfo'
import JobInfo from './components/JobInfo'
import PersonInfo from './components/PersonInfo'
import PlaceInfo from './components/PlaceInfo'
import ServicesInfo from './components/ServicesInfo'
import { useAboutMeStore } from './stores/aboutMeStore'
import { useJobStore } from './stores/jobStore'
import { usePersonStore } from './stores/personStore'
import { usePlaceStore } from './stores/placeStore'
import { useServicesStore } from './stores/servicesStore'
import { updateUser } from '@/modules/client/query/user/useUpdateUser'

export default function UserInfo() {
    const [isPubliclyListed, setIsPubliclyListed] = React.useState(false)

    const { user, isLoading: isLoadingUser, setUser } = useUser()

    const personStore = usePersonStore()
    const jobStore = useJobStore()
    const servicesStore = useServicesStore()
    const placeStore = usePlaceStore()
    const aboutMeStore = useAboutMeStore()

    useEffect(() => {
        if (!user) return

        personStore.setMail(user.email)
        personStore.setName(user.name)
        personStore.setPhoneNumer(user.phoneNumber)

        jobStore.setJobTitle(user.jobTitle)
        jobStore.setExperience(user.experience)
        jobStore.setIsClinicPsychologist(user.isClinicPsychologist)

        servicesStore.setOnlineService(user.onlineService)
        servicesStore.setInPersonService(user.inPersonService)

        placeStore.setCountry(user.country)
        placeStore.setCity(user.city)
        placeStore.setAddress(user.address)
        placeStore.setPostalCode(user.postalCode)

        aboutMeStore.setAboutMe(user.aboutMe)
        aboutMeStore.setStatus(user.status)
        aboutMeStore.setWebsite(user.website)

        setIsPubliclyListed(user.isPubliclyListed)
    }, [user])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const email = personStore.mail
        const name = personStore.name
        const phoneNumber = personStore.phoneNumber
        const jobTitle = jobStore.jobTitle
        const experience = jobStore.experience
        const isClinicPsychologist = jobStore.isClinicPsychologist
        const onlineService = servicesStore.onlineService
        const inPersonService = servicesStore.isPersonService
        const country = placeStore.city
        const city = placeStore.city
        const address = placeStore.address
        const postalCode = placeStore.postalCode
        const aboutMe = aboutMeStore.aboutMe
        const status = aboutMeStore.status
        const website = aboutMeStore.website

        const updatedUser = {
            ...user,
            email,
            name,
            phoneNumber,
            jobTitle,
            experience,
            isClinicPsychologist,
            onlineService,
            inPersonService,
            country,
            city,
            address,
            postalCode,
            aboutMe,
            status,
            website,
            isPubliclyListed,
        } as User

        try {
            const u = await updateUser(updatedUser)
            setUser(u)
            showAlert('success', 'short', 'User updated successfully')
        } catch (error) {
            showAlert('error', 'short', 'Failed to update user, contact support please.')
        }
    }

    if (isLoadingUser) return <Loading />

    if (!user) return <div>error</div>

    return (
        <section>
            <div className="mb-36 flex flex-col space-y-8">
                <PersonInfo user={user} />
                <ServicesInfo user={user} />
                <AboutMeInfo user={user} />
                <PlaceInfo user={user} />
                <JobInfo user={user} />

                <div className="form-control w-min">
                    <label className="label flex w-min cursor-pointer gap-5">
                        <span className="label-text whitespace-nowrap">
                            Be publicly listed{' '}
                        </span>
                        <input
                            type="checkbox"
                            className="toggle"
                            checked={isPubliclyListed}
                            onChange={() => {
                                setIsPubliclyListed(!isPubliclyListed)
                            }}
                        />
                    </label>
                </div>

                <label className="form-control w-full max-w-xs md:col-start-2">
                    <div className="label">
                        <span className="label-text">Save changed?</span>
                    </div>

                    <button onClick={handleSubmit} className="btn btn-primary">
                        Edit
                    </button>
                </label>
            </div>
        </section>
    )
}
