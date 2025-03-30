import { User } from '@/modules/shared/types/mainTypes'
import { useJobStore } from '../stores/jobStore'

export default function JobInfo(props: { user: User }) {
    const jobStore = useJobStore()

    return (
        <div className="flex w-full max-w-xl flex-col">
            <h4 className="font-bold">Job Info</h4>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Experience</span>
                </div>
                <input
                    type="number"
                    className="input input-bordered w-full"
                    value={jobStore.experience}
                    onChange={(e) => jobStore.setExperience(Number(e.target.value))}
                    placeholder={`${props.user.experience} years`}
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Job Title</span>
                </div>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={jobStore.jobTitle}
                    onChange={(e) => jobStore.setJobTitle(e.target.value)}
                    placeholder={props.user.jobTitle}
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Clinic Psychologist</span>
                </div>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={jobStore.isClinicPsychologist ? 'Yes' : 'No'}
                    onChange={(e) =>
                        jobStore.setIsClinicPsychologist(e.target.value === 'Yes')
                    }
                    placeholder={props.user.isClinicPsychologist ? 'Yes' : 'No'}
                />
            </label>
        </div>
    )
}
