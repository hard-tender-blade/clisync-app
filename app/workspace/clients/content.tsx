'use client'
import React from 'react'
import List from './components/list'
import { ClientsListProvider } from './context/clientsListProvider'
import ToolBar from './components/toolBar'
import ListHeder from './components/listHeder'

export default function Content() {
    return (
        <div>
            <ClientsListProvider>
                <div className="h-screen overflow-hidden">
                    <div>
                        <ToolBar />
                        <ListHeder />
                    </div>
                    <List />
                </div>
            </ClientsListProvider>
        </div>
    )
}
