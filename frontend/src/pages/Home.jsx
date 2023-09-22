import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useNavigate } from 'react-router-dom';
import "../stylesheets/calendar.css";
import interactionPlugin from '@fullcalendar/interaction';
import FormVacation from '../components/FormVacation';
import { addVacation, deleteVacation, getVacations } from '../services/vacationService';
import { formatDateToString, operateDate } from '../helpers/misc/dateUtils';
import { useAlert } from '../contexts/AlertContext'; // Importa el contexto
import CustomTable from '../components/CustomTable';
import CheckIcon from "../imgs/check.svg";
import CrossIcon from "../imgs/cross.svg";
import QuestionIcon from "../imgs/question-square.svg";
import ViewEye from "../imgs/eye.svg";

export default function Home({auth}){

    const navigate = useNavigate();
    const { alertConfig,setAlertConfig } = useAlert(); // Usa el contexto alert

    // Efecto que redirige a la página de inicio de sesión si no hay usuario autenticado.
    useEffect(()=>{
        const isNotLoginPage = location.pathname !== "/login";
        if(!auth.user && isNotLoginPage){
            navigate("/login");
        }
    }, [auth, navigate]);

    const [isAvailableForm, setIsAvailableForm] = useState(false); // Estado que controla si el formulario de vacaciones está disponible
    const [vacationDaysAsked, setVacationDaysAsked] = useState([{start: "", end: "", title: "Vacaciones"}]); // Estado que almacena los días de vacaciones solicitados
    const [fetchData, setFetchData] = useState([]); // Estado que guarda los datos de vacaciones obtenidos del servidor
    const [selectItem, setSelectItem] = useState(null); // Estado que almacena el elemento seleccionado en la tabla
    const [actionButton, setActionButton] = useState(); // Estado que indica la acción a realizar

    // Función para obtener las vacaciones del servidor
    const fetchVacations = async () => {
        try {
            const vacations = await getVacations();
            if(vacations.status !== 200) throw new Error("Error de servidor, intentar más tarde");
            let temporalVacations = [...vacationDaysAsked];
            vacations.data.map((event)=>{
                const vacation = {
                    allDay: true,
                    color: "grey",
                    editable: false,
                    start: event.start_date,
                    end: formatDateToString(operateDate(new Date(event.end_date), 1)),
                    title: "Vacaciones"
                };
                temporalVacations.push(vacation);
            });

            setFetchData(vacations.data);
            setVacationDaysAsked(temporalVacations);
        } catch (error) {
            setAlertConfig({
                show: true,
                status: 'danger',
                title: 'Error',
                message: `Hubo un error al cargar las vacaciones, ${error}`,
            });
        }
    };

    // Función para manejar el evento de solicitud de formulario de vacaciones
    const handleVacationFormRequest = () => {
        setIsAvailableForm(!isAvailableForm);
    };

    // Función para manejar el cambio en el evento del calendario
    const handleEventChange = (e) => {
        let initalYear= e.event._instance.range.start.getFullYear();
        let initialMonth= (e.event._instance.range.start.getMonth()+1).toString();
        let initialDay= operateDate(e.event._instance.range.start , 1).getDate();
        const NEW_INITIAL_DATE= `${initalYear}-${initialMonth.length <= 1 ? `0${initialMonth}` : initialMonth}-${initialDay.length <= 1 ? `0${initialDay}` : initialDay}`;

        let finalMonth= (e.event._instance.range.end.getMonth()+1).toString();
        let finalDay= operateDate(e.event._instance.range.end , 1).getDate();

        const NEW_END_DATE = `${initalYear}-${finalMonth.length <= 1 ? `0${finalMonth}` : finalMonth}-${finalDay.length <= 1 ? `0${finalDay}` : finalDay}`;

        setVacationDaysAsked([...fetchData,
            {
                title: vacationDaysAsked[0].title,
                start: NEW_INITIAL_DATE,
                end:  formatDateToString(operateDate(new Date(NEW_END_DATE), 1)),
            }
        ]);
    };

    // Función para formatear las vacaciones en la tabla
    const formatVacationsToTable = (vacations) => {
        let temporalVacations = [];
        const status = {
            aproved: "Aprobado",
            denied: "Denegado",
            revision: "En Evaluación",
            null: "Pendiente"
        };
        vacations.map((event)=>{
            const vacation = {
                ...event,
                start_date: formatDateToString(new Date(event.start_date),"DD/MM/YYYY"),
                end_date: formatDateToString(new Date(event.end_date),"DD/MM/YYYY"),
                date_asked: formatDateToString(new Date(event.date_asked),"DD/MM/YYYY hh:mm:ss"),
                status: status[event.status]
            };
            temporalVacations.push(vacation);
        });
        return temporalVacations;
    };

    // Función para manejar el evento de clic en un evento del calendario
    const handleEventClick = (e) => {

    };

    // Función para manejar el envío del formulario de vacaciones
    const handleForm = (state) => {
        setVacationDaysAsked([...fetchData,
            {
                title: vacationDaysAsked[0].title,
                start: state.initialDate,
                end: formatDateToString(operateDate(new Date(state.finalDate), 2))
            }
        ]);
    };

    // Función para manejar la presentación del formulario
    const handleSubmit = async e => {
        e.preventDefault();
        let vacationToSend = vacationDaysAsked[vacationDaysAsked.length -1];
        vacationToSend = {
            start_date: new Date(vacationToSend.start),
            end_date:  operateDate(new Date(vacationToSend.end), -1),
            status: null,
            note: null,
            date_asked: new Date(),
            area_manager_authorization: null,
        };
        try {
            await addVacation(vacationToSend);
            setAlertConfig({
                show: true,
                status: 'success',
                title: 'Guardado',
                message: 'Se creó la vacación exitosamente',
            });
            setTimeout(() =>navigate("/"),alertConfig.timeOff+500);
        } catch (error) {
            console.error(error.message);
            setAlertConfig({
                show: true,
                status: 'danger',
                title: 'Error',
                message: `No se pudo registrar la fecha, inténtelo nuevamente más tarde (${error.message})`,
            });
        }
    };

    // Función para manejar las acciones de la tabla
    const handleAction = (e) => {
        switch (e.type) {}
        useEffect(() => {},handleAction,)
        name
    };
    // Función que se llama en la tabla para condicional las acciones
    const isDisabledCondition = (row,child) =>{
        // row es la fila a analisar y child es el boton de accion que estan abajo
        return(row['area_manager_authorization'] !== null && child.props.name != 'seeDetails')
    }

    // Efecto para realizar una acción según el botón presionado
    useEffect((e) => {
        switch (actionButton){
            case "edit":
                hanleEditVacation(selectItem);
                break;
            case "delete":
                hanleDeleteVacation(selectItem);
                break;
            case "seeDetails":
                hanleSeeDetailsVacation(selectItem);
                break;

        }
    },[selectItem,actionButton]);

    // Función para manejar la edición de una vacación
    const hanleEditVacation = (item) => {
        console.log("se esta editando",item);

    };

    // Función para manejar la eliminación de una vacación
    const hanleDeleteVacation = async (item) => {
        console.log("se esta Eliminando",item);
        const response = await deleteVacation(item.id)
        fetch()
        console.log(response);
    };

    // Función para manejar la visualización de detalles de una vacación
    const hanleSeeDetailsVacation = (item) => {
        console.log("se esta Viendo detalles",item);
    };

    // Efecto para cargar las vacaciones al montar el componente
    useEffect(()=>{
        fetchVacations();
    },[]);

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
                                dayMaxEventRows: 2 // ajustar a 6 solo para timeGridWeek/timeGridDay
                                }
                            }}
                            eventResize={ function(info) {
                                alert(info.event.title + " end is now " + info.event.end.toISOString());

                                if (!confirm("¿Esto está bien?")) {
                                    info.revert();
                                }
                            }}
                        />
                    </div>

                </section>
                <section className='aside_main col-lg-6 col-md-12 col-10 text-center mx-auto'>                    
                    <button  className={isAvailableForm ? "button_ask_vacation_called" : "button_ask_vacation"} onClick={handleVacationFormRequest}>
                        {isAvailableForm ? "Cancelar" : "Pedir Vacaciones"}
                    </button>
                    <div className='form_vacation_container '>
                        <FormVacation isCalled={isAvailableForm} formFather={handleForm} handleSubmit={handleSubmit}/>
                        <CustomTable
                            rows={formatVacationsToTable(fetchData).filter(v=>v)}
                            fields={[
                                // ["date_asked","Solicitud"],
                                ["start_date","Inicio"],
                                ["end_date","Fin"],
                                ["status","Estado"],
                            ]}
                            setSelectItem={setSelectItem}
                            msgNotRows="No hay vacaciones pendientes"
                            isDisabledCondition={isDisabledCondition}
                        > 
                            <button className="btn p-0 btn_table w-100" name='edit' onClick={()=>{setActionButton("edit")}}>Editar <i className="bi bi-pencil-square"></i></button>
                            <button className="btn p-0 btn_table w-100" name='delete' onClick={()=>{setActionButton("delete")}}>Eliminar <i className="bi bi-calendar-x-fill"></i></button>
                            <button className="btn p-0 btn_table w-100" name='seeDetails' onClick={()=>{setActionButton("seeDetails")}}>Ver Detalles <i className="bi bi-eye"></i></button>
                        </CustomTable>
                    </div>  
                </section>
            </div>
        </div>
    );
}
