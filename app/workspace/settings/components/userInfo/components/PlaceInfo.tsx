import { User } from '@/modules/shared/types/mainTypes'
import { usePlaceStore } from '../stores/placeStore'

export default function PlaceInfo(props: { user: User }) {
    const placeStore = usePlaceStore()
    return (
        <div className="flex w-full max-w-xl flex-col">
            <h4 className="font-bold">Place Info</h4>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">City</span>
                </div>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={placeStore.city}
                    onChange={(e) => placeStore.setCity(e.target.value)}
                    placeholder={props.user.city}
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Country</span>
                </div>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={placeStore.country}
                    onChange={(e) => placeStore.setCountry(e.target.value)}
                    placeholder={props.user.country}
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Address</span>
                </div>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={placeStore.address}
                    onChange={(e) => placeStore.setAddress(e.target.value)}
                    placeholder={props.user.address}
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Postal Code</span>
                </div>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={placeStore.postalCode}
                    onChange={(e) => placeStore.setPostalCode(e.target.value)}
                    placeholder={props.user.postalCode}
                />
            </label>
        </div>
    )
}
