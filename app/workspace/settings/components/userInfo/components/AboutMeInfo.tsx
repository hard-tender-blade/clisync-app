import { User } from '@/modules/shared/types/mainTypes'
import { useAboutMeStore } from '../stores/aboutMeStore'

export default function AboutMeInfo(props: { user: User }) {
    const aboutMeStore = useAboutMeStore()
    return (
        <div className="flex w-full max-w-xl flex-col">
            <h4 className="font-bold">About me</h4>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">About Me</span>
                </div>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={aboutMeStore.aboutMe}
                    onChange={(e) => aboutMeStore.setAboutMe(e.target.value)}
                    placeholder={props.user.aboutMe}
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Status</span>
                </div>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={aboutMeStore.status}
                    onChange={(e) => aboutMeStore.setStatus(e.target.value)}
                    placeholder={props.user.status}
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Website</span>
                </div>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={aboutMeStore.website}
                    onChange={(e) => aboutMeStore.setWebsite(e.target.value)}
                    placeholder={props.user.website}
                />
            </label>
        </div>
    )
}
