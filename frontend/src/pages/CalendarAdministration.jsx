import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import "../stylesheets/calendarAdministration.css"
import { getAllVacations } from "../services/vacationService";

export default function CalendarAdministration(){

    const [vacationsAsked, setVacationsAsked] = useState([])
 
    useEffect(()=>{
        const callVacation = async ()=>{
            const request = await getAllVacations();
            const vacations = await request.data

            const newVacations = []
            vacations.map(vacation =>{
                let newVacation = {
                    title: "Vacation Request",
                    start: vacation.start_date.substring(0, 10),
                    end: vacation.end_date.substring(0, 10)
                }
                newVacations.push(newVacation)
            })

            setVacationsAsked(newVacations);
        }

        callVacation()
        console.log("NEW VACATIONS: ", vacationsAsked)
    }, [])


    return(
        <>
           <section className='calendar_admin_section'>
        
                <div className="calendar_admin_container">
                    <FullCalendar
                        plugins={[ dayGridPlugin, interactionPlugin ]}
                        initialView="dayGridMonth"
                        events={vacationsAsked}
                        buttonText={{today: "Hoy"}}
                        // eventChange={handleEventChange}
                        editable={true}
                        // eventClick={handleEventClick}
                        dayMaxEventRows={true}
                        height="700px"
                        views= {{
                            timeGridMonth: {
                            dayMaxEventRows: 2 // adjust to 6 only for timeGridWeek/timeGridDay
                            }
                        }}
                        eventResize={ function(info) {
                            alert(info.event.title + " end is now " + info.event.end.toISOString());
                        
                            if (!confirm("is this okay?")) {
                            info.revert();
                            }
                        }
                    }
                    />
                </div>
            
        </section>
        </>
    )
}