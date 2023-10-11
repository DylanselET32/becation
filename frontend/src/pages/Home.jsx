import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useNavigate } from 'react-router-dom';
import "../stylesheets/calendar.css";
import interactionPlugin from '@fullcalendar/interaction';
import FormVacation from '../components/FormVacation';
import { addVacation, deleteVacation, editVacation, getVacations } from '../services/vacationService';
import { calculateDaysBetweenDates, formatDateToString, operateDate } from '../helpers/misc/dateUtils';
import { useAlert } from '../contexts/AlertContext'; // Importa el contexto
import CustomTable from '../components/CustomTable';
import ModalSeeVacationDetaills from '../components/vacationsModal/ModalSeeVacationDetaills';
import ConfirmationModal from '../components/ConfirmationModal';
import useConfirmation from '../hooks/useConfirmation';
import { Modal } from 'react-bootstrap';
import DeleteVacationBody from '../components/vacationsModal/DeleteVacationBody'
import ModalEditVacation from '../components/vacationsModal/ModalEditVacation';
import { getEmployer } from '../services/employeeServices';
import Loading from '../components/Loading';
import Unauthorized from '../components/Unauthorized';
export default function Home({auth,privilegeLevelCondition}){

    const { alertConfig,setAlertConfig } = useAlert(); // Usa el contexto alert
    
    const navigate = useNavigate();
    // Efecto que redirige a la página de inicio de sesión si no hay usuario autenticado.
    useEffect(()=>{
        if(auth.user){
            setLoaded(1)
        }else{
            setLoaded(2)
        }
    },[auth])
    const [loaded,setLoaded] = useState(0); 
    const initialFetch = {vacations:[]}
    const [isAvailableForm, setIsAvailableForm] = useState(false); // Estado que controla si el formulario de vacaciones está disponible
    const [vacationDaysAsked, setVacationDaysAsked] = useState([{start: "", end: "", title: "Vacaciones"}]); // Estado que almacena los días de vacaciones solicitados
    const [fetchDataToCalendar, setFetchDataToCalendara] = useState([]); // Estado que guarda los datos de vacaciones obtenidos del servidor
    const [fetchData, setFetchData] = useState(initialFetch); // Estado que guarda los datos de vacaciones obtenidos del servidor
    const [selectItem, setSelectItem] = useState(null); // Estado que almacena el elemento seleccionado en la tabla
    const [actionButton, setActionButton] = useState(); // Estado que indica la acción a realizar
    const [showModalSeeDetails,setShowModalSeeDetails] = useState(false); // Estado que controla al modal 
    const [showModalDelete,setShowModalDelete] = useState(false); // Estado que controla al modal deletevacation
    const [showModalEdit,setShowModalEdit] = useState(false); // Estado que controla al modal deletevacation
    const toggleShowModalDelete = ()=>{setShowModalDelete(!showModalDelete)};
    // Función para obtener las vacaciones del servidor
    const fetchVacations = async () => {
        if(!auth.user){return;}
        try {
            setVacationDaysAsked([])
            setFetchDataToCalendara([])
            setFetchData(initialFetch)
            const vacations = await getVacations();
            if(vacations.status !== 200) throw new Error("Error de servidor, intentar más tarde");
            const employer = await getEmployer();
            if(employer.status !== 200) throw new Error("Error de servidor, intentar más tarde");
            let temporalVacations = [];
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

            setFetchData({vacations:vacations.data,employer:employer.data});
            setVacationDaysAsked(temporalVacations);
            setFetchDataToCalendara(temporalVacations)
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
        if(isAvailableForm){
            setVacationDaysAsked(fetchDataToCalendar)
        }
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

        setVacationDaysAsked([...fetchDataToCalendar,
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
    
        // Ordena las vacaciones por la fecha de inicio más próxima
        vacations.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
        
        vacations.forEach((event) => {
            const vacation = {
                ...event,
                start_date: formatDateToString(new Date(event.start_date), "DD/MM/YYYY"),
                end_date: formatDateToString(new Date(event.end_date), "DD/MM/YYYY"),
                date_asked: formatDateToString(new Date(event.date_asked), "DD/MM/YYYY hh:mm:ss"),
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
        setVacationDaysAsked([...fetchDataToCalendar,
            {
                title: 'Vacacion',
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
        if( fetchData.employer?.available_days < calculateDaysBetweenDates(vacationToSend.start_date,vacationToSend.end_date)){
            setAlertConfig({
                show: true,
                status: 'warning',
                title: 'Vacaciones no accesibles',
                message: `No Contas con dias suficientes para esas vacaciones, Elija menos dias...`,
            });
            return;
        }
        try {
            await addVacation(vacationToSend);
            setAlertConfig({
                show: true,
                status: 'success',
                title: 'Guardado',
                message: 'Se creó la vacación exitosamente',
            });
            refresh()
            setIsAvailableForm(false);
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
        setShowModalEdit(true)
    };

    // Función para manejar la eliminación de una vacación
    const hanleDeleteVacation = async (item) => {
        toggleShowModalDelete()
    };
    

    // Función para manejar la visualización de detalles de una vacación
    const hanleSeeDetailsVacation = (item) => {
        setShowModalSeeDetails(true)
    };
    const refresh = () => {
        fetchVacations();
      };
    // Efecto para cargar las vacaciones al montar el componente
    useEffect(()=>{
        fetchVacations();
    },[]);

    return(<>{loaded == 0 ?<Loading/>:
        loaded == 2 ?<Unauthorized auth={auth}/>:
    
        <>
        <div className="container-lg">
            <Modal show={showModalDelete} onHide={toggleShowModalDelete}>
                  <DeleteVacationBody
                    title="Eliminar Vacacion"
                    refresh={refresh}
                    toggle={toggleShowModalDelete}
                    item={selectItem}
                    itemView=""
                    delete={deleteVacation}
                  />
            </Modal>
            <ModalEditVacation show={showModalEdit} setShow={setShowModalEdit} item={selectItem} refresh={refresh}/>
            <ModalSeeVacationDetaills show={showModalSeeDetails} setShow={setShowModalSeeDetails} item={selectItem}/>
            <div className="row">
                <section className='col-lg-6 col-md-12 col-12  mt-3 ' style={{height: '85vh'}}>
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
                            height="85vh"
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
                <section className='d-flex flex-column mt-3 col-lg-6 col-md-12 col-10 text-center mx-auto d-flex'>                    
                    <div className='row d-flex align-items-center justify-content-around'>
                        <button  className={`col-10 col-lg-5 ${isAvailableForm ? "button_ask_vacation_called" : "button_ask_vacation"}`} onClick={handleVacationFormRequest}>
                            {isAvailableForm ? "Cancelar" : "Pedir Vacaciones"}
                        </button>
                        <span className={`badge fs-5 col-10 col-lg-5 my-2 my-lg-0 ${
                            fetchData.employer?.available_days>= 15?'bg-success':
                            fetchData.employer?.available_days>= 5?'bg-warning':'bg-danger'
                        }`}>Dias disp.: { fetchData.employer?.available_days || '...'}</span>
                    </div>
                    
                    <div className='form_vacation_container'>
                        <div className='d-flex justify-content-center text-align-center w-100'>
                        <FormVacation isCalled={isAvailableForm} formFather={handleForm} handleSubmit={handleSubmit}/>
                        </div>
                    </div>  
                        <CustomTable
                            rows={formatVacationsToTable(fetchData.vacations).filter(v=>v)}
                            fields={[
                                // ["date_asked","Solicitud"],
                                ["start_date","Inicio"],
                                ["end_date","Fin"],
                                ["status","Estado"],
                            ]}
                            setSelectItem={setSelectItem}
                            msgNotRows="No hay vacaciones pendientes"
                            isDisabledCondition={isDisabledCondition}
                            maxHeight={!isAvailableForm?"75vh":'48vh'}
                        > 
                            <button className="btn p-0 btn_table w-100" name='edit' onClick={()=>{setActionButton("edit")}}>Editar <i className="bi bi-pencil-square"></i></button>
                            <button className="btn p-0 btn_table w-100" name='delete' onClick={()=>{setActionButton("delete")}}>Eliminar <i className="bi bi-calendar-x-fill"></i></button>
                            <button className="btn p-0 btn_table w-100" name='seeDetails' onClick={()=>{setActionButton("seeDetails")}}>Ver Detalles <i className="bi bi-eye"></i></button>
                        </CustomTable>
                </section>
            </div>
        </div>
        </>}</>
    );
}
