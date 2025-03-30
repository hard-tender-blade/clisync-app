
export default function showModal({
    title,
    content,
    confirmText,
    confirmClass,
    cancelText,
    cancelClass,
    onConfirm,
    onCancel,
}: {
    title: string
    content: string
    confirmText: string
    confirmClass: string
    cancelClass: string
    cancelText: string
    onConfirm: () => Promise<void>
    onCancel: () => Promise<void>
}) {
    const modal = document.getElementById('modal')
    const modalTitle = document.getElementById('modal-title')
    const modalContent = document.getElementById('modal-content')
    const modalConfirm = document.getElementById('modal-confirm')
    const modalCancel = document.getElementById('modal-cancel')

    if (!modal || !modalTitle || !modalContent || !modalConfirm || !modalCancel) return
    modalTitle.innerText = title
    modalContent.innerText = content

    modalConfirm.innerText = confirmText
    modalCancel.innerText = cancelText

    modalConfirm.className = confirmClass
    modalCancel.className = cancelClass

    modalConfirm.onclick = async () => {
        await onConfirm()
        //@ts-ignore
        modal.close()
    }
    modalCancel.onclick = async () => {
        await onCancel()
        //@ts-ignore
        modal.close()
    }

    //@ts-ignore
    modal.showModal()
}
