'use client'
import { Day } from '@/modules/shared/types/calendar';
import { Client, SessionWithClient, User } from '@/modules/shared/types/mainTypes';
import { UseQueryResult } from '@tanstack/react-query';
import { createContext, useContext } from 'react';

interface MonthCalendarContextType {
    months: UseQueryResult<{
        monthId: string;
        days: Day[];
    }[], Error>
    loadNextMonth: () => Promise<void>;
    loadPrevMonth: () => Promise<void>;
    scrollToCurrentMonth: boolean
    setScrollToCurrentMonth: (value: boolean) => void;
    firstLoad: boolean
    setFirstLoad: (value: boolean) => void;

    selectedDay: Day | undefined;
    setSelectedDay: (day: Day) => void;

    mode: 'month' | 'editor';
    setMode: (mode: 'month' | 'editor') => void;

    selectedSession: SessionWithClient | undefined;
    setSelectedSession: (session: SessionWithClient) => void;
    handleCLickOnSession: (session: SessionWithClient) => void;
    handleClickMonthView: () => void;

    goToToday: () => void;
    user: User | undefined;
    createSession: ({
        start,
        end,
        client,
        addToUserGoogleCalendar,
        inviteClientOnGoogleCalendarEvent,
        note,
    }: {
        start: Date;
        end: Date;
        client: Client;
        addToUserGoogleCalendar: boolean;
        inviteClientOnGoogleCalendarEvent: boolean;
        note: string;
    }) => Promise<void>;
}

export const MonthCalendarContext = createContext<MonthCalendarContextType | undefined>(undefined);

export const useMonthCalendar = () => {
    const context = useContext(MonthCalendarContext);
    if (!context) {
        throw new Error('No Context');
    }
    return context;
};
