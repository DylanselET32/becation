import {React} from "react";
import "../stylesheets/vacationAdministration.css"
import { useState, useEffect } from "react";
import {  getVacations, editVacation } from "../services/vacationService";
import { formatDateToString, operateDate } from "../helpers/misc/dateUtils";
import CustomTable from "../components/CustomTable";
import { Modal } from "react-bootstrap";
import AproveVacationBody from "../components/vacationsModal/AproveVacationBody";
import DenyVacationBody from "../components/vacationsModal/DenyVacationBody";
import SendRevisionBody from "../components/vacationsModal/SendRevisionBody";
import { useNavigate } from "react-router-dom";
import Unauthorized from "../components/Unauthorized";


export default function VacationManager({auth,privilegeLevelCondition}){

    const [selectItem, setSelectItem] = useState(null); // Estado que almacena el elemento seleccionado en la tabla
    const [actionButton, setActionButton] = useState(); // Estado que indica la acción a realizar
    const [fetchData, setFetchData] = useState([]); //Estado para guardar todas las vacaciones
    const [showModalAprove,setShowModalAprove] = useState(false); // Estado que controla al modal deletevacation
    const [showModalDeny, setShowModalDeny ] = useState(false);
    const [showModalSendRevision, setShowModalSendRevision ] = useState(false)
    const [noteRevision, setNoteRevision] = useState('');
    const navigate = useNavigate();

    const [filter, setFilter] = useState([]); // Estado de filtro

    const toggleShowModalDeny = ()=>{setShowModalDeny(!showModalDeny)};
    const toggleShowModalAprove = ()=>{setShowModalAprove(!showModalAprove)};
    const toggleShowModalSendRevision = ()=>{setShowModalSendRevision(!showModalSendRevision)};

    const handleNoteChange = (newState) => {
        setNoteRevision(newState);
        console.log("NOTA: ",noteRevision)
      }

    //Pedir todas las vacaciones y mostrarlas
    const fetchVacations = async () => {
        if(!auth?.user){return}
        try {
            setFetchData([])
            setFilter([])
            const vacations = await getVacations();

            const vacationsAproved = vacations.data.filter(v => v.area_manager_authorization == 1)

            if(vacations.status !== 200) throw new Error("Error de servidor, intentar más tarde");
            setFetchData(vacationsAproved);
            
            setFilter(vacationsAproved.filter(f => f.status == null))     
            console.log("VACAS APROBADAS: ", vacationsAproved)
        } catch (error) {
            setAlertConfig({
                show: true,
                status: 'danger',
                title: 'Error',
                message: `Hubo un error al cargar las vacaciones, ${error}`,
            });
        }
    };

    useEffect(()=>{
        fetchVacations();
    },[auth]);

    //Manejo de acciones en cada vacacion
    useEffect((e) => {
        switch (actionButton){
            case "aprove":
                handleAproveVacation(selectItem);
                break;
            case "deny":
                handleDenyVacation(selectItem);
                break;
            case "sendNote":
                handleSendNote(selectItem);
                break; 
            case "calendar":
                handleSeeCalendar(selectItem);
                break;

        }
    },[selectItem,actionButton]);


    //Formateo de renderizado en la tabla
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


    const formatDateToSend = (inputFecha) => {
        const partes = inputFecha.split('/');
        
        if (partes.length !== 3 || isNaN(partes[0]) || isNaN(partes[1]) || isNaN(partes[2])) {
          return 'Formato de fecha no válido';
        }
      
        const dia = partes[0];
        const mes = partes[1];
        const anio = partes[2];
      
        const fechaFormateada = `${anio}-${mes}-${dia}`;
        return fechaFormateada;
      }

      function formatDateAsked(inputFecha) {
        const [fechaParte, horaParte] = inputFecha.split(' ');
      
        if (!fechaParte || !horaParte) {
          return 'Formato de fecha y hora no válido';
        }
      
        const [mes, dia, anio] = fechaParte.split('/');
        const [hora, minutos, segundos] = horaParte.split(':');
      
        if (isNaN(mes) || isNaN(dia) || isNaN(anio) || isNaN(hora) || isNaN(minutos) || isNaN(segundos)) {
          return 'Formato de fecha y hora no válido';
        }
      
        const fechaFormateada = `${anio}-${mes}-${dia}T${hora}:${minutos}:${segundos}`;
        return fechaFormateada;
      }
      

    //Acciones de vacacion
    const handleAproveVacation = (item) => {
        console.log("se esta aprobando...",item);
        toggleShowModalAprove()
    };

    const handleDenyVacation = async (item) => {
        console.log("se esta denegando...",item);
        toggleShowModalDeny()
    };
    
    const handleSendNote = (item) => {
        console.log("Nota a... ",item);
        toggleShowModalSendRevision();
    };

    const handleSeeCalendar = (item) => {
        console.log("redireccionando... ",item)
        navigate(`/vacationManagerCalendar/${item?.id}`)
    }

    //Recarga la pagina
    const refresh = () => {
        fetchVacations();
      };

    //Maneja en que casos ciertas acciones no estaran disponibles  
    const isDisabledCondition = (row,child) =>{
        return((row["status"] == "Aprobado" && child.props.name == "deny") 
                || (row["status"] == "Aprobado" && child.props.name == "aprove")
                || (row["status"] == "Aprobado" && child.props.name == "sendNote")
                || (row["status"] == "Denegado" && child.props.name == "deny")
                )
    }

    //Cambio de filtro
    const handleFilter = (e)=> {

        let temporalFilter = []

        if(e.target.value == "all"){
            setFilter(fetchData);
            return
        }else if(e.target.value == "null"){
            temporalFilter = fetchData.filter((event)=> event.status == null);
            setFilter(temporalFilter)
            return
        }
        temporalFilter = fetchData.filter((event)=> event.status == e.target.value);
        setFilter(temporalFilter)
    }

    const editVacationFetch = async (selectItem, newStatus)=>{
        let newVacationState = {
            employee: selectItem.employee,
            start_date: `${formatDateToSend(selectItem.start_date)}T00:00:00`,
            end_date: `${formatDateToSend(selectItem.end_date)}T00:00:00`,
            status: newStatus,
            note: selectItem.note,
            date_asked: formatDateAsked(selectItem.date_asked),
            area_manager_authorization: selectItem.area_manager_authorization
        }

        console.log("LO QUE SE ENVÍA", newVacationState)
        let idVacation = selectItem.id
        const response = editVacation(newVacationState, idVacation)
        const data = await response.data
        console.log("RESPONSE: ", data )

    }

    const editVacationNoteFetch = async (selectItem, newStatus)=>{
        let newVacationState = {
            employee: selectItem.employee,
            start_date: `${formatDateToSend(selectItem.start_date)}T00:00:00`,
            end_date: `${formatDateToSend(selectItem.end_date)}T00:00:00`,
            status: newStatus,
            note: noteRevision,
            date_asked: formatDateAsked(selectItem.date_asked),
            area_manager_authorization: selectItem.area_manager_authorization
        }

        let idVacation = selectItem.id
        const response = editVacation(newVacationState, idVacation)
        const data = await response.data
    }

    //Prueba de acciones
        const aproveVacation = async () => {
            await editVacationFetch(selectItem, "aproved")
            console.log("APROBADOOOOOOOOOO");
        }

        const denyVacation = async ()=>{
            await editVacationFetch(selectItem, "denied")
        }

        const sendRevision = async ()=>{
            await editVacationNoteFetch(selectItem, "revision")
            refresh()
        }

    return( <>
        {(!privilegeLevelCondition(auth.user?.privileges))?<Unauthorized auth={auth}/>:
        <>
        {/* MODAL DE REVISIÓN */}
        <Modal show={showModalSendRevision} onHide={toggleShowModalSendRevision}>
            <SendRevisionBody
                title="Enviar Nota"
                refresh={refresh}
                toggle={toggleShowModalSendRevision}
                item={selectItem}
                sendRevision={sendRevision}
                handleNoteChange={handleNoteChange}
                >
            </SendRevisionBody>
        </Modal>

        {/* MODAL DE DENEGACÓN */}
        <Modal show={showModalDeny} onHide={toggleShowModalDeny}>
            <DenyVacationBody
                title="Denegar Vacación"
                refresh={refresh}
                toggle={toggleShowModalDeny}
                item={selectItem}
                deny={denyVacation}
            >
            </DenyVacationBody>
        </Modal>
        
        {/* MODAL DE APROBACIÓN */}
        <Modal show={showModalAprove} onHide={toggleShowModalAprove}>
            <AproveVacationBody
                title="Aprobar Vacación"
                refresh= {refresh}
                toggle={toggleShowModalAprove}
                item={selectItem}
                aprove={aproveVacation}
            >
            </AproveVacationBody>
        </Modal>

        <div className="container-lg">
            <div className="d-flex justify-content-between align-items-center mt-3">
                <h1>Gestión de Vacaciones</h1>
                <select name="filterVacation" id="filterVacation" onChange={handleFilter} className="select_filter" >
                    <option value="null">Pending</option>
                    <option value="denied">Denieded</option>
                    <option value="aproved">Approved</option>
                    <option value="revision">In Revision</option>
                    <option value="all">All</option>
                </select>
            </div>
            <div className="row">
                <CustomTable
                    rows={formatVacationsToTable(filter)}
                    fields={[
                        ["start_date","Inicio"],
                        ["end_date","Fin"],
                        ["status","Estado"],
                    ]}
                    setSelectItem={setSelectItem}
                    msgNotRows="No hay vacaciones pendientes"
                    isDisabledCondition={isDisabledCondition}
                    
                    > 
                    <button className="btn p-0 btn_table w-100" name='aprove' onClick={()=>{setActionButton("aprove")}}>Aprobar <i className="bi bi-pencil-square"></i></button>
                    <button className="btn p-0 btn_table w-100" name='deny' onClick={()=>{setActionButton("deny")}}>Denegar <i className="bi bi-calendar-x-fill"></i></button>
                    <button className="btn p-0 btn_table w-100" name='sendNote' onClick={()=>{setActionButton("sendNote")}}>Mandar Comentario <i className="bi bi-eye"></i></button>
                    <button className="btn p-0 btn_table w-100" name='calendar' onClick={()=>{setActionButton("calendar")}}>Ver en Calendario<i className="bi bi-eye"></i></button>


                </CustomTable>
            </div>
        </div>
        </>}</>
        
    
    )
}