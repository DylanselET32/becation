import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import "../stylesheets/calendar.css"


export default function Calendar(){

    return(
        <main>
            <section className='calendar_section'>
        
                <div className="calendar_container">
                    <FullCalendar
                        plugins={[ dayGridPlugin ]}
                        initialView="dayGridMonth"
                    />
                </div>
            </section>
        </main>
    )
}