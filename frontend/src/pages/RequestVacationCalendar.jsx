import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useNavigate } from 'react-router-dom'
import "../stylesheets/calendar.css"
import interactionPlugin from '@fullcalendar/interaction';
import FormVacation from '../components/FormVacation'
import { addVacation, getAllVacations, getVacations } from '../services/vacationService'
import { formatDateToString, operateDate } from '../helpers/misc/dateUtils'



export default function RequestVacationCalendar({auth}){

    const navigate = useNavigate();
    
    useEffect(()=>{
        const e = location.pathname != "/login";
        console.log("diferente de login?:",e)
        console.log("USER:",!auth.user)
        if(!auth.user && e){
          console.log("YENDO A LOGIN")
          navigate("/login");
        }
      }, [])


    const [isAvailableForm, setIsAvailableForm] = useState(false)
    const [vacationDaysAsked, setVacationDaysAsked] = useState([{start: "", end: "", title: "Vacaciones"}])
    const [fetchData, setFetchData] = useState([{start: "", end: "", title: "Vacaciones"}])

    const fecth = async ()=>{
        const vacations = await getVacations();
        console.log(vacations)
        let temporalVacations = []
        vacations.data.map((event)=>{
            console.log(event.end_date)
            const vacation = {allDay: true, editable:false ,start: event.start_date, end: formatDateToString(operateDate(new Date(event.end_date), 1)), title: "Vacations"  }
            temporalVacations.push(vacation)
        })

        setFetchData(temporalVacations)
        setVacationDaysAsked(temporalVacations)
    }

    const handleVacationFormRequest = ()=>{
        setIsAvailableForm(!isAvailableForm)
    }

    const handleEventChange = (e)=>{
        console.log(e.event._instance.range.end.getDate())

        let initalYear= e.event._instance.range.start.getFullYear()
        let initialMonth= (e.event._instance.range.start.getMonth()+1).toString()
        let initialDay= operateDate(e.event._instance.range.start , 1).getDate()
        const NEW_INITIAL_DATE= `${initalYear}-${initialMonth.length <= 1 ? `0${initialMonth}` : initialMonth}-${initialDay.length <= 1 ? `0${initialDay}` : initialDay}`

        let finalMonth= (e.event._instance.range.end.getMonth()+1).toString()
        let finalDay= operateDate(e.event._instance.range.end , 1).getDate()

        console.log("PPP",finalDay)

        const NEW_END_DATE = `${initalYear}-${finalMonth.length <= 1 ? `0${finalMonth}` : finalMonth}-${finalDay.length <= 1 ? `0${finalDay}` : finalDay}`

        setVacationDaysAsked([...fetchData,
            {
            title: vacationDaysAsked[0].title,
            start: NEW_INITIAL_DATE,
            end:  formatDateToString(operateDate(new Date(NEW_END_DATE), 1)),
            }
        ])
    }

    const handleEventClick = (e)=>{
        console.log(e.event._def.title)
    }

    const handleForm = (state)=>{
        setVacationDaysAsked([...fetchData,
            {   
                title: vacationDaysAsked[0].title,
                start: state.initialDate,
                end: formatDateToString(operateDate(new Date(state.finalDate), 2))
            }
        ])
    }

    const handleSubmit = async e=>{
        e.preventDefault()
        let vacationToSend = vacationDaysAsked[vacationDaysAsked.length -1]
        vacationToSend = {
            start_date : new Date(vacationToSend.start),
            end_date:  operateDate(new Date(vacationToSend.end), -1),
            status: "null",
            note: null,
            date_asked: new Date(),
            area_manager_authorization: 0,
        }
        await addVacation(vacationToSend)
        alert("SE CREO LA VACACION")
    }

    useEffect(()=>{
        fecth()
    },[])
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
                    <FormVacation isCalled={isAvailableForm} formFather={handleForm} handleSubmit={handleSubmit}/>
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
