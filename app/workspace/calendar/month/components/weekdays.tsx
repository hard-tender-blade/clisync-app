import React from 'react'

export default function Weekdays() {
    return (
        <div className="grid grid-cols-7">
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => {
                return (
                    <div
                        key={day}
                        className="h-7 border-b border-l-0 border-t-0 border-solid border-base-200 text-center first:border-l-0 last:border-r-0 md:pr-2 md:text-end"
                    >
                        <span className="text-sm font-bold opacity-70">{day}</span>
                    </div>
                )
            })}
        </div>
    )
}
