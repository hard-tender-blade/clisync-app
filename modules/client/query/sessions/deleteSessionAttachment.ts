const deleteSessionsAttachment = async (id: string): Promise<boolean> => {
    const response = await fetch(`/api/sessions/attachments/${id}`, {
        method: 'DELETE',
    })

    return response.status === 200
}
export default deleteSessionsAttachment