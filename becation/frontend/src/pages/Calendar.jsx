import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import "../stylesheets/calendar.css"
import interactionPlugin from '@fullcalendar/interaction';
import FormVacation from '../components/FormVacation'

const events= [
    { title: "Evento 3 ", start: "2023-08-23", end: "2023-08-30", },
    { title: "Evento 4 ", start: "2023-08-23", end: "2023-08-30", },
    { title: "Evento 5 ", start: "2023-08-23", end: "2023-08-30", },
    { title: "Evento 6 ", start: "2023-08-23", end: "2023-08-30", },
    { title: "Evento 7 ", start: "2023-08-23", end: "2023-08-30", },
    { title: "Evento 8 ", start: "2023-08-23", end: "2023-08-30", },
    { title: "Evento 9 ", start: "2023-08-23", end: "2023-08-30", },
    { title: "Evento 10 ", start: "2023-08-23", end: "2023-08-30", },
    { title: "Evento 11 ", start: "2023-08-23", end: "2023-08-30", },
    { title: "Evento 12 ", start: "2023-08-23", end: "2023-08-30", }, { title: "Evento 5 ", start: "2023-08-23", end: "2023-08-30", },
]

export default function Calendar(){

    const [isAvailableForm, setIsAvailableForm] = useState(false)

    const handleVacationFormRequest = ()=>{
        setIsAvailableForm(true)
    }

    const handleEventChange = (e)=>{
        console.log(e.event._instance.range.start)
    }

    const handleEventClick = (e)=>{
        console.log(e.event._def.title)
    }

    return(
        <main>
            <section className='calendar_section'>
        
                <div className="calendar_container">
                    <FullCalendar
                        plugins={[ dayGridPlugin, interactionPlugin ]}
                        initialView="dayGridMonth"
                        events={events}
                        buttonText={{today: "Hoy"}}
                        eventChange={handleEventChange}
                        editable={true}
                        eventClick={handleEventClick}
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
            <section className='aside_main'>
                <button className='button_ask_vacation' onClick={handleVacationFormRequest}>Pedir Vacaciones</button>
                <div className='form_vacation_container'>
                    { isAvailableForm && <FormVacation/>}
                </div>
            </section>
            
        </main>
    )

   
    
}
// function renderEventContent(eventInfo) {
//     return (
//       <div className='custom-event'>
//         <p className='event-title'>{eventInfo.event.title}</p>
//       </div>
//     );
//   }


// eventContent={true ? renderEventContent : null} para mas adelante por si sobre tiempo, callback para custom css
