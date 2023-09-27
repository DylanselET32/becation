import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addVacation, deleteVacation, getVacations } from '../services/vacationService';
import { formatDateToString, operateDate } from '../helpers/misc/dateUtils';
import { useAlert } from '../contexts/AlertContext'; // Importa el contexto
import CustomTable from '../components/CustomTable';
import ModalEditVacation from '../components/vacationsModal/ModalSeeVacationDetaills';
import { Modal } from 'react-bootstrap';
import DeleteVacationBody from '../components/vacationsModal/DeleteVacationBody'
import { getAllEmployers, deleteEmployer } from '../services/employeeServices';
import ModalSeeProfileDetails from '../components/profilesModal/ModalSeeProfileDetails';

export default function Home({auth}){

  const navigate = useNavigate();
  const { alertConfig,setAlertConfig } = useAlert(); // Usa el contexto alert
  const [isAvailableForm, setIsAvailableForm] = useState(false); // Estado que controla si el formulario de empleados está disponible
  const [fetchData, setFetchData] = useState([]); // Estado que guarda los datos de empleados obtenidos del servidor
  const [selectItem, setSelectItem] = useState(null); // Estado que almacena el elemento seleccionado en la tabla
  const [actionButton, setActionButton] = useState(); // Estado que indica la acción a realizar
  const [showModalSeeDetails,setShowModalSeeDetails] = useState(false); // Estado que controla al modal 
  const [showModalDelete,setShowModalDelete] = useState(false); // Estado que controla al modal deletevacation
  const toggleShowModalDelete = ()=>{setShowModalDelete(!showModalDelete)};
  
  // Función para obtener los empleados del servidor
  const fetchEmployers = async () => {
    try {
      setFetchData([])
      const employers = await getAllEmployers();
      if(employers.status !== 200) throw new Error("Error de servidor, intentar más tarde");
      setFetchData(employers.data);
    }catch (error) {
      setAlertConfig({
        show: true,
        status: 'danger',
        title: 'Error',
        message: `Hubo un error al cargar los empleados, ${error}`,
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
    // row es la fila a analizar y child es el boton de accion que estan abajo
    return(row['area_manager_authorization'] !== null && child.props.name != 'seeDetails')
  }
  // Efecto para realizar una acción según el botón presionado
  useEffect((e) => {
    switch (actionButton){
      case "edit":
        handleEditEmployer(selectItem);
        break;
      case "delete":
        handleDeleteEmployer(selectItem);
        break;
      case "seeDetails":
        handleSeeDetailsEmployer(selectItem);
        break;
    }
    setActionButton("")
  },[selectItem,actionButton]);
  // Función para manejar la edición de un empleado
  const handleEditEmployer = (item) => {
    console.log("se esta editando",item);
  };
  // Función para manejar la eliminación de un empleado
  const handleDeleteEmployer = async (item) => {
    console.log("Se esta eliminando",item);
    toggleShowModalDelete()
  };
  // Función para manejar la visualización de detalles de un empleado
  const handleSeeDetailsEmployer = (item) => {
    console.log("se esta viendo detalles",item);
    setShowModalSeeDetails(true)
  };
  const refresh = () => {
    fetchEmployers();
  };
  // Efecto para cargar los empleados al montar el componente
  useEffect(()=>{
    fetchEmployers();
  },[]);
  return(
    <div className="container-lg">
      <h1>{actionButton}</h1>
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
      <ModalSeeProfileDetails show={showModalSeeDetails} setShow={setShowModalSeeDetails} item={selectItem}/>
      <div className="row">
        <section className='d-flex flex-column mt-3 col-lg-6 col-md-12 col-10 text-center mx-auto d-flex'>
          <CustomTable
            rows={fetchData.filter(v=>v.is_able==true)}
            fields={[
              // ["date_asked","Solicitud"],
              ["name","Nombre"],
              ["email","Email"],
              ["area","Area"],
              ["role_name","Rol"]
            ]}
            setSelectItem={setSelectItem}
            msgNotRows="No se encontraron empleados"
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
  );
}
