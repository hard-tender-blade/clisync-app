import React from 'react'
import { BlockInterface } from './editor/context/editorContext'
import Editor from './editor/editor'
import { useMonthCalendar } from '../context/monthCalendarContext'
import updateSessionById from '@/modules/client/query/sessions/updateSessionById'
import { showAlert } from '@/modules/client/utils/alert/alerts'
import { showLoading, hideLoading } from '@/modules/client/utils/loading/loadingModule'

export default function EditorWrapper() {
    const { selectedSession, setSelectedSession } = useMonthCalendar()

    const handleSaveSession = async () => {
        if (!selectedSession) return

        showLoading()
        try {
            const res = await updateSessionById(selectedSession.id, selectedSession)
            if (res) {
                showAlert('success', 'mid', 'Session saved successfully')
            } else {
                showAlert('error', 'mid', 'Failed to save session')
            }
        } catch (error) {
            showAlert('error', 'mid', 'Failed to save session')
            hideLoading()
        }

        hideLoading()
    }

    if (!selectedSession) {
        return null
    }

    return (
        <div className="flex h-full w-full flex-col items-center">
            <button className="btn btn-primary mt-10" onClick={handleSaveSession}>
                Save
            </button>

            <Editor
                blocks={JSON.parse(selectedSession.note)}
                setBlocks={(blocks: BlockInterface[]) => {
                    setSelectedSession({
                        ...selectedSession!,
                        note: JSON.stringify(blocks),
                    })
                }}
            />
        </div>
    )
}
