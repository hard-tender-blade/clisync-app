import { createRoot } from 'react-dom/client'
import {
    IoAlertCircle,
    IoAlertCircleOutline,
    IoCheckmarkCircle,
    IoInformationCircle,
} from 'react-icons/io5'
import './styles.css'

export const showAlert = (
    type: 'success' | 'error' | 'warning' | 'info',
    lifeTime: 'short' | 'mid' | 'long' | 'close',
    message: string,
) => {
    let LIFE_TIME = 3000
    if (lifeTime === 'mid') LIFE_TIME = 5000
    if (lifeTime === 'long') LIFE_TIME = 7000

    const alertStack = document.querySelector('#alert-stack')
    const alertContainer = document.createElement('div')
    alertContainer.className = 'animate-fadeInUp'

    alertStack?.appendChild(alertContainer)

    const root = createRoot(alertContainer)

    let alertColor = 'alert-info'
    if (type === 'success') alertColor = 'alert-success'
    if (type === 'warning') alertColor = 'alert-warning'
    if (type === 'error') alertColor = 'alert-error'

    const Alert = () => (
        <div
            role="alert"
            className={`alert ${alertColor} flex w-[80vw] px-8 md:w-[50vw]`}
        >
            <div className="text-white">
                {type === 'info' && <IoInformationCircle className="h-5 w-5" />}
                {type === 'success' && <IoCheckmarkCircle className="h-5 w-5" />}
                {type === 'warning' && <IoAlertCircleOutline className="h-5 w-5" />}
                {type === 'error' && <IoAlertCircle className="h-5 w-5" />}
            </div>
            <span className="text-white">{message}</span>
            {lifeTime === 'close' && (
                <button
                    className="p-1"
                    onClick={() => {
                        alertContainer.className = 'animate-fadeOutDown'

                        setTimeout(() => {
                            root.unmount()
                            alertStack?.removeChild(alertContainer)
                        }, 1000)
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            )}
        </div>
    )

    if (alertContainer) {
        root.render(<Alert />)

        if (lifeTime === 'close') return
        setTimeout(() => {
            alertContainer.className = 'animate-fadeOutDown'
        }, LIFE_TIME)

        setTimeout(() => {
            root.unmount()
            alertStack?.removeChild(alertContainer)
        }, LIFE_TIME + 1000)
    }
}
