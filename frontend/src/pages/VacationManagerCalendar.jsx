import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import "../stylesheets/calendarAdministration.css";
import { getAllVacationsByArea, getVacationById } from "../services/vacationService";
import { formatDateToString, operateDate } from "../helpers/misc/dateUtils";

export default function VacationManagerCalendar({auth}){
    const id_vacacion = useParams();
    const [vacations, setVacations] = useState([]);
    const [vacationParams,setVacationParams] = useState();
    const navigate = useNavigate();
    const volverAtras = ()=>{
        navigate(-1);
    };

    useEffect(()=>{
        const isNotLoginPage = location.pathname !== "/login";
        if(!auth.user && isNotLoginPage){
            navigate("/login");
        }
    }, [auth, navigate]);

    const fetchData = async()=>{
        const vacationByParams = await getVacationById(parseInt(id_vacacion.id));
        const vacationData = vacationByParams.data;
        setVacationParams(vacationData)
    };

    useEffect(()=>{
        const callVacation = async ()=>{
            const unaVacacion = await getVacationById(parseInt(id_vacacion.id));
            const unaVacResponse = await unaVacacion.data;

            const area_id = unaVacResponse.area_id;

            const request = await getAllVacationsByArea(parseInt(area_id));
            const response = await request.data

            let newVacations = []

            response.map(vacation =>{

            
                if(vacation.id !== parseInt(id_vacacion.id)){
                    let newVacation = {
                        title: vacation.name,
                        start: vacation.start_date.substring(0, 10),
                        end: formatDateToString(operateDate(new Date(vacation.end_date), 1))
                    }
                    newVacations.push(newVacation)
                }else{
                    let newVacation = {
                        title: vacation.name,
                        start: vacation.start_date.substring(0, 10),
                        end: formatDateToString(operateDate(new Date(vacation.end_date), 1)),
                        color: '#8AC3FD'
                    }
                    newVacations.push(newVacation)
                }
                
            })
            
            setVacations(newVacations);
        }

        callVacation()
    }, [])


    useEffect(()=>{
        fetchData() 
    },[])

    return(
        <>
        <div className="ms-4 d-flex align-items-center justify-content-start">
            <button className="btn-volver" onClick={volverAtras}>Volver</button>
            <h2 className="title-user-data">{vacationParams?.name} - {vacationParams?.surname} - {vacationParams?.area}</h2>
        </div>
        <section className='calendar_admin_section'>
            <div className="calendar_admin_container">
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    initialView="dayGridMonth"
                    events={vacations}
                    buttonText={{today: "Hoy"}}
                    
                    eventColor="gray"
                    
                    dayMaxEventRows={true}
                    height="75vh"
                    views= {{
                        timeGridMonth: {
                        dayMaxEventRows: 1
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