import { User } from '@/modules/shared/types/mainTypes'
import { useServicesStore } from '../stores/servicesStore'

export default function ServicesInfo(props: { user: User }) {
    const servicesStore = useServicesStore()
    return (
        <div className="flex w-full max-w-xl flex-col">
            <h4 className="font-bold">Services Info</h4>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Online Service</span>
                </div>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={servicesStore.onlineService ? 'Yes' : 'No'}
                    onChange={(e) =>
                        servicesStore.setOnlineService(e.target.value === 'Yes')
                    }
                    placeholder={props.user.onlineService ? 'Yes' : 'No'}
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">In person Service</span>
                </div>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={servicesStore.isPersonService ? 'Yes' : 'No'}
                    onChange={(e) =>
                        servicesStore.setInPersonService(e.target.value === 'Yes')
                    }
                    placeholder={props.user.onlineService ? 'Yes' : 'No'}
                />
            </label>
        </div>
    )
}
