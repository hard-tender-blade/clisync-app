import { User } from '@/modules/shared/types/mainTypes'
import { usePersonStore } from '../stores/personStore'

export default function PersonInfo(props: { user: User }) {
    const personStore = usePersonStore()

    return (
        <div className="flex w-full max-w-xl flex-col">
            <h4 className="font-bold">Person Info</h4>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Name</span>
                </div>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={personStore.name}
                    onChange={(e) => personStore.setName(e.target.value)}
                    placeholder={props.user.name}
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Phone Number</span>
                </div>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={personStore.phoneNumber}
                    onChange={(e) => personStore.setPhoneNumer(e.target.value)}
                    placeholder={props.user.phoneNumber}
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Email</span>
                </div>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={personStore.mail}
                    onChange={(e) => personStore.setMail(e.target.value)}
                    placeholder={props.user.email}
                />
            </label>
        </div>
    )
}
