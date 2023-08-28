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
    const [vacationDaysAsked, setVacationDaysAsked] = useState([{start: "", end: "", title: "Vacaciones"}])


    const handleVacationFormRequest = ()=>{
        setIsAvailableForm(!isAvailableForm)
    }

    const handleEventChange = (e)=>{
        console.log(e.event._instance.range.end.getDate())

        let initalYear= e.event._instance.range.start.getFullYear()
        let initialMonth= (e.event._instance.range.start.getMonth()+1).toString()
        let initialDay= (e.event._instance.range.start.getDate()+1).toString()
        const NEW_INITIAL_DATE= `${initalYear}-${initialMonth.length <= 1 ? `0${initialMonth}` : initialMonth}-${initialDay.length <= 1 ? `0${initialDay}` : initialDay}`

        let finalMonth= (e.event._instance.range.end.getMonth()+1).toString()
        let finalDay= (e.event._instance.range.end.getDate()+1).toString()
        const NEW_END_DATE = `${initalYear}-${finalMonth.length <= 1 ? `0${finalMonth}` : finalMonth}-${finalDay.length <= 1 ? `0${finalDay}` : finalDay}`

        setVacationDaysAsked([{
            title: vacationDaysAsked[0].title,
            start: NEW_INITIAL_DATE,
            end: NEW_END_DATE
        }])
    }

    const handleEventClick = (e)=>{
        console.log(e.event._def.title)
    }

    const handleForm = (state)=>{
        setVacationDaysAsked([
            {   
                title: vacationDaysAsked[0].title,
                start: state.initialDate,
                end: state.finalDate
            }
        ])
    }

    return(
        <main>
            <section className='calendar_section'>
        
                <div className="calendar_container">
                    <FullCalendar
                        plugins={[ dayGridPlugin, interactionPlugin ]}
                        initialView="dayGridMonth"
                        events={vacationDaysAsked}
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
                <button className={isAvailableForm ? "button_ask_vacation_called" : "button_ask_vacation"} onClick={handleVacationFormRequest}>
                    {isAvailableForm ? "Cancelar" : "Pedir Vacaciones"}
                </button>
                <div className='form_vacation_container'>
                    <FormVacation isCalled={isAvailableForm} formFather={handleForm}/>
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
