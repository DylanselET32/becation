import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useNavigate } from 'react-router-dom'
import "../stylesheets/calendar.css"
import interactionPlugin from '@fullcalendar/interaction';
import FormVacation from '../components/FormVacation'
import { addVacation, getVacations } from '../services/vacationService'
import { formatDateToString, operateDate } from '../helpers/misc/dateUtils'
import { useAlert } from '../contexts/AlertContext'// Importa el contexto
import TableVacation from '../components/TableVacation'
import CheckIcon from "../imgs/check.svg"
import CrossIcon from "../imgs/cross.svg"
import QuestionIcon from "../imgs/question-square.svg"
import ViewEye from "../imgs/eye.svg"



export default function Home({auth}){

    const navigate = useNavigate();
    const { alertConfig,setAlertConfig } = useAlert(); // Usa el contexto alert

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
    const [fetchData, setFetchData] = useState([])

    const fecth = async ()=>{
        try {
            const vacations = await getVacations();
            if(vacations.status!=200)throw new Error("error de servidor, intentar mas tarde");
            let temporalVacations = [...vacationDaysAsked]
            vacations.data.map((event)=>{
                const vacation = {allDay: true, color:"grey" ,editable:false ,start: event.start_date, end: formatDateToString(operateDate(new Date(event.end_date), 1)), title: "Vacations"  }
                temporalVacations.push(vacation)
            })

            setFetchData(vacations.data)
            setVacationDaysAsked(temporalVacations)
        } catch (error) {
            setAlertConfig({
                show:true,
                status: 'danger',
                title: 'Error',
                message: `Hubo un error al cargar las vacaciones, ${error}`,
                });
        }
        
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

        const NEW_END_DATE = `${initalYear}-${finalMonth.length <= 1 ? `0${finalMonth}` : finalMonth}-${finalDay.length <= 1 ? `0${finalDay}` : finalDay}`

        setVacationDaysAsked([...fetchData,
            {
            title: vacationDaysAsked[0].title,
            start: NEW_INITIAL_DATE,
            end:  formatDateToString(operateDate(new Date(NEW_END_DATE), 1)),
            }
        ])
    }

    const formatVacationsToTable = (vacations)=>{
        let temporalVacations = []
        console.log(vacations)
        const status = {
            aproved:"Aprovado",
            denied:"Denegado",
            revision:"En Evaluacion",
            null:"Pendiente"
        }
        vacations.map((event)=>{
            const vacation = {...event,
                start_date:formatDateToString(new Date(event.start_date),"DD/MM/YYYY"), 
                end_date: formatDateToString(new Date(event.end_date),"DD/MM/YYYY"), 
                date_asked: formatDateToString(new Date(event.date_asked),"DD/MM/YYYY hh:mm:ss"),
                status: status[event.status]
            }
            temporalVacations.push(vacation)
        })
        return temporalVacations
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
            status: null,
            note: null,
            date_asked: new Date(),
            area_manager_authorization: null,
        }
        try {
            await addVacation(vacationToSend)
            setAlertConfig({
            show:true,
            status: 'success',
            title: 'Guardado',
            message: 'Se creó la vacación exitosamente',
            });
            setTimeout(() =>navigate("/"),alertConfig.timeOff+500)
        } catch (error) {
            console.error(error.message)
            setAlertConfig({
                show:true,
                status: 'danger',
                title: 'Error',
                message: `No se pudo registrar la fecha, intentelo nuevamente mas tarde (${error.message})`,
            });
        }
        
    }

    useEffect(()=>{
        fecth()
    },[])
    return(
        <div className="container-lg">
            <div className="row">
                <section className='col-lg-6 col-md-12 col-12 calendarHeight' >
                <div className="calendar_container ">
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
                <section className='aside_main col-lg-6 col-md-12 col-10 text-center mx-auto'>                    
                    <button  className={isAvailableForm ? "button_ask_vacation_called" : "button_ask_vacation"} onClick={handleVacationFormRequest}>
                        {isAvailableForm ? "Cancelar" : "Pedir Vacaciones"}
                    </button>
                    <div className='form_vacation_container '>
                        <FormVacation isCalled={isAvailableForm} formFather={handleForm} handleSubmit={handleSubmit}/>
                        
                        <TableVacation
                            vacations={formatVacationsToTable(fetchData).filter(v=>v)}
                            fields={[
                                // ["date_asked","Solicitud"],
                                ["start_date","Inicio"],
                                ["end_date","Fin"],
                                ["status","Estado"],
                                
                            ]}
                            
                        > 
                            <button className="btn p-0 btn_table">Editar <i className="bi bi-pencil-square"></i></button>
                            <button className="btn p-0 btn_table">Eliminar <i className="bi bi-calendar-x-fill"></i></button>
                            <button className="btn p-0 btn_table">Ver Detalles <i className="bi bi-eye"></i></button>
                        </TableVacation>
                        </div>  
                    
                </section>
            </div>
            
        </div>
    )

   
    
}
