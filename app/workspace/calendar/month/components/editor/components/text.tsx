import React from 'react'

const li = {
    approve: 'Schválit',
    cancel: 'Zrušit',
}

export default function TextModal({
    id,
    title,
    placeholder,
    icon,
    onApply,
    onClose,
}: {
    id: string
    title: string
    placeholder: string
    icon: React.ReactNode
    onApply: (data: string) => void
    onClose: () => void
}) {
    return (
        <div
            id={id}
            className="bg-b fixed left-0 top-0 z-50 flex hidden h-screen w-screen items-center justify-center bg-opacity-10 backdrop-blur-sm"
        >
            <div className="max-w-[40rem] rounded-lg bg-white px-6 pb-6 pt-2 shadow">
                <h4 className="text-xl font-semibold">{title}</h4>

                <div className="flex w-full gap-3">
                    <label className="input input-bordered flex w-full items-center gap-2">
                        {icon}
                        <input
                            id={id + '-input'}
                            type="text"
                            className="w-full"
                            placeholder={placeholder}
                        />
                    </label>{' '}
                    <div className="flex gap-3">
                        {/* if there is a button in form, it will close the modal */}
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                const el = document.getElementById(id)
                                el?.classList.add('hidden')

                                const data = (
                                    document.getElementById(
                                        id + '-input',
                                    ) as HTMLInputElement
                                ).value

                                onApply(data)
                            }}
                        >
                            {li.approve}
                        </button>

                        {/* if there is a button in form, it will close the modal */}
                        <button
                            className="btn"
                            onClick={() => {
                                const el = document.getElementById(id)
                                el?.classList.add('hidden')

                                onClose()
                            }}
                        >
                            {li.cancel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
