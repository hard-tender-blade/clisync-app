import { QuickNote } from "@/modules/shared/types/mainTypes";

const processQuickNotes = async (clientId: string, quickNotes: QuickNote[]): Promise<QuickNote[] | null> => {
    const res = await fetch(`/api/clients/${clientId}/quickNotes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(quickNotes)
    })
    if (res.status !== 200) return null
    return await res.json()
}
export default processQuickNotes