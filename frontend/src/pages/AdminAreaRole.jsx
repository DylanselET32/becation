import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useNavigate } from 'react-router-dom';
import "../stylesheets/calendar.css";
import interactionPlugin from '@fullcalendar/interaction';
import FormVacation from '../components/FormVacation';
import { addVacation, deleteVacation, editVacation, getVacations } from '../services/vacationService';
import { formatDateToString, operateDate } from '../helpers/misc/dateUtils';
import { useAlert } from '../contexts/AlertContext'; // Importa el contexto
import CustomTable from '../components/CustomTable';
import ModalSeeVacationDetaills from '../components/vacationsModal/ModalSeeVacationDetaills';
import DeleteVacationBody from '../components/vacationsModal/DeleteVacationBody'
import ModalEditVacation from '../components/vacationsModal/ModalEditVacation';
import { Modal } from 'react-bootstrap';
import { deleteRole, getAllRoles } from '../services/roleServices';
import { deleteArea, getAllAreas } from '../services/areaServices';
import Loading from '../components/Loading';
import ModalEditArea from '../components/areaModal/ModalEditArea';
import ModalSeeAreaDetails from '../components/areaModal/ModalSeeAreaDetaills';
export default function AdminAreaRole({auth}){

    const navigate = useNavigate();
    const { alertConfig,setAlertConfig } = useAlert(); // Usa el contexto alert

    //Efecto que redirige a la página de inicio de sesión si no hay usuario autenticado.
    // useEffect(()=>{
    //     const isNotLoginPage = location.pathname !== "/login";
    //     console.log(location.pathname)
    //     if(!auth.user && isNotLoginPage){
    //         navigate("/login");
    //     }
    // }, [auth, navigate]);



    const [fetchAreas, setFetchAreas] = useState([]); // Estado que guarda los datos de vacaciones obtenidos del servidor
    const [fetchRoles, setFetchRoles] = useState([]); // Estado que guarda los datos de vacaciones obtenidos del servidor
    const [selectItem, setSelectItem] = useState(null); // Estado que almacena el elemento seleccionado en la tabla
    const [actionButton, setActionButton] = useState(); // Estado que indica la acción a realizar
    const [showModalSeeDetailsArea,setShowModalSeeDetailsArea] = useState(false); // Estado que controla al modal 
    const [showModalSeeDetailsRole,setShowModalSeeDetailsRole] = useState(false); // Estado que controla al modal 
    const [showModalDeleteArea,setShowModalDeleteArea] = useState(false); // Estado que controla al modal deletevacation
    const [showModalDeleteRole,setShowModalDeleteRole] = useState(false); // Estado que controla al modal deletevacation
    const [showModalEditArea,setShowModalEditArea] = useState(false); // Estado que controla al modal deletevacation
    const [showModalEditRole,setShowModalEditRole] = useState(false); // Estado que controla al modal deletevacation
    const [isLoaded,setIsLoaded] = useState(false); 

    const toggleShowModalDeleteArea = ()=>{setShowModalDeleteArea(!showModalDeleteArea)};
    const toggleShowModalDeleteRole = ()=>{setShowModalDeleteRole(!showModalDeleteRole)};
    // Función para obtener las vacaciones del servidor
    const fetchVacations = async () => {
        try {
            setIsLoaded(false)
            setFetchAreas([]);
            setFetchRoles([]);

            const areas = await getAllAreas()
            if(areas.status !== 200) throw new Error("Error de servidor, intentar más tarde");
            
            const roles = await getAllRoles()
            if(roles.status !== 200) throw new Error("Error de servidor, intentar más tarde");
           
            console.log("AREAS",areas)
            console.log("ROLES",roles)
            setFetchAreas(areas.data);
            setFetchRoles(roles.data);
            setIsLoaded(true)
        } catch (error) {
            setAlertConfig({
                show: true,
                status: 'danger',
                title: 'Error',
                message: `Hubo un error al cargar las vacaciones, ${error}`,
            });
        }
    };

  
    // Función para formatear las vacaciones en la tabla
    const formatAreaToTable = (areas) => {
        let temporalArr = [];
        
        areas.forEach((area) => {
            const obj = {
                ...area,
                to_create: formatDateToString(new Date(area.to_create), "DD/MM/YYYY hh:mm:ss"),
            };
            temporalArr.push(obj);
        });
    
        return temporalArr;
    };
    const formatRoleToTable = (roles) => {
        let temporalArr = [];
        
        roles.forEach((role) => {
            const obj = {
                ...role,
                to_create: formatDateToString(new Date(role.to_create), "DD/MM/YYYY hh:mm:ss"),
            };
            temporalArr.push(obj);
        });
    
        return temporalArr;
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
                setShowModalEditArea(true)
                break;
            case "deleteArea":
                toggleShowModalDeleteArea();
                break;
            case "deleteRole":
                toggleShowModalDeleteRole();
                break;
            case "seeDetails":
                hanleSeeDetailsVacation(selectItem);
                break;

        }
    },[selectItem,actionButton]);

    
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

    return(
        <div className="container-lg">
            <Modal show={showModalDeleteArea && !showModalDeleteRole} onHide={toggleShowModalDeleteArea}>
                  <DeleteVacationBody
                    title="Eliminar Area"
                    refresh={refresh}
                    toggle={toggleShowModalDeleteArea}
                    item={selectItem}
                    delete={deleteArea}
                  />
            </Modal>
            <Modal show={showModalDeleteRole && !showModalDeleteArea} onHide={toggleShowModalDeleteRole}>
                  <DeleteVacationBody
                    title="Eliminar Rol"
                    refresh={refresh}
                    toggle={toggleShowModalDeleteRole}
                    item={selectItem}
                    delete={deleteRole}
                  />
            </Modal>
            <ModalEditArea show={showModalEditArea} setShow={setShowModalEditArea} item={selectItem} refresh={refresh}/>
            <ModalSeeAreaDetails show={showModalSeeDetailsArea} setShow={setShowModalSeeDetailsArea} item={selectItem}/>
            {/* <ModalEditRole show={showModalEditRole} setShow={setShowModalEditArea} item={selectItem} refresh={refresh}/>
            <ModalSeeRoleDetails show={showModalSeeDetailsRole} setShow={setShowModalSeeDetailsRole} item={selectItem}/> */}
            
            {isLoaded?
            <div className="row">
                <section className='d-flex flex-column mt-3 col-lg-6 col-md-12 col-10 text-center mx-auto d-flex'>                    
                        <h2>Administrador de Areas</h2>
                        <CustomTable
                            rows={formatAreaToTable(fetchAreas).filter(v=>v)}
                            fields={[
                                ["area","Nombre"],
                                ["name","Jefe"],
                                ["to_create","Creacion"],
                            ]}
                            setSelectItem={setSelectItem}
                            msgNotRows="No hay areas pendientes"                            
                        > 
                            <button className="btn p-0 btn_table w-100" name='edit' onClick={()=>{setActionButton("edit")}}>Editar <i className="bi bi-pencil-square"></i></button>
                            <button className="btn p-0 btn_table w-100" name='delete' onClick={()=>{setActionButton("delete")}}>Eliminar <i className="bi bi-calendar-x-fill"></i></button>
                            <button className="btn p-0 btn_table w-100" name='seeDetails' onClick={()=>{setActionButton("seeDetails")}}>Ver Detalles <i className="bi bi-eye"></i></button>
                        </CustomTable>
                </section>
                <section className='d-flex flex-column mt-3 col-lg-6 col-md-12 col-10 text-center mx-auto d-flex'>                    
                        <h2>Administrador de Roles</h2>
                        <CustomTable
                            rows={formatRoleToTable(fetchRoles).filter(v=>v)}
                            fields={[
                                ["role_name","Nombre"],
                                ["to_create","Fecha de Creacion"],
                                
                            ]}
                            setSelectItem={setSelectItem}
                            msgNotRows="No hay roles presentes"
        
                        > 
                            <button className="btn p-0 btn_table w-100" name='edit' onClick={()=>{setActionButton("edit")}}>Editar <i className="bi bi-pencil-square"></i></button>
                            <button className="btn p-0 btn_table w-100" name='delete' onClick={()=>{setActionButton("delete")}}>Eliminar <i className="bi bi-calendar-x-fill"></i></button>
                            <button className="btn p-0 btn_table w-100" name='seeDetails' onClick={()=>{setActionButton("seeDetails")}}>Ver Detalles <i className="bi bi-eye"></i></button>
                        </CustomTable>
                </section>
            </div>
            :
            <Loading/>
            }
            
        </div>
    );
}