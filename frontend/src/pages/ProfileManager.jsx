import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../contexts/AlertContext'; // Importa el contexto
import CustomTable from '../components/CustomTable';
import { Modal } from 'react-bootstrap';
import { getAllEmployers, deleteEmployer, resetPassword, disableUserByEmployerId } from '../services/employeeServices';
import ModalSeeProfileDetails from '../components/profilesModal/ModalSeeProfileDetails';
import ModalDeleteProfile from '../components/profilesModal/ModalDeleteProfile';

export default function ProfileManager({auth}){

  const navigate = useNavigate();
  
  const { alertConfig,setAlertConfig } = useAlert(); // Usa el contexto alert
  const [isAvailableForm, setIsAvailableForm] = useState(false); // Estado que controla si el formulario de empleados está disponible
  const [fetchData, setFetchData] = useState([]); // Estado que guarda los datos de empleados obtenidos del servidor
  const [selectItem, setSelectItem] = useState(null); // Estado que almacena el elemento seleccionado en la tabla
  const [actionButton, setActionButton] = useState(); // Estado que indica la acción a realizar
  const [showModalSeeDetails,setShowModalSeeDetails] = useState(false); // Estado que controla al modal 
  const [showModalDelete,setShowModalDelete] = useState(false); // Estado que controla al modal ModalDeleteProfile
  const toggleShowModalDelete = ()=>{setShowModalDelete(!showModalDelete)};
  
  useEffect(()=>{
    const isNotLoginPage = location.pathname !== "/login";
    if(!auth.user && isNotLoginPage){
        navigate("/login");
    }
  }, [auth, navigate]);

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
      case "resetPassword":
        handleResetPassword(selectItem);
        break;
    }
    setActionButton("")
  },[selectItem,actionButton]);

  // Función para redirigir a Register
  const handleButton = () => {
    navigate('/registerUser');
  }

  // Función para manejar la edición de un empleado
  const handleEditEmployer = (item) => {
    navigate(`/profileConfig/${item?.id}`);
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
  //Función para blanquear la contraseña de un empleado
  const handleResetPassword = async (item) => {
    console.log("Blanqueando contraseña");
    try{
      const reset = await resetPassword(item?.id);
      if(reset.status !== 200){
        throw new Error("Error de servidor, intentar más tarde"); 
      } else{
        setAlertConfig({
          show: true,
          status: 'success',
          title:'Guardado',
          message: 'Se ha blanqueado la contraseña éxitosamente'
        })
      }

    }catch (error){
      setAlertConfig({
        show: true,
        status: 'danger',
        title: 'Error',
        message: `Hubo un error al blanquear la contraseña, ${error}`,
      });
    }
  }
  const refresh = () => {
    fetchEmployers();
  };
  // Efecto para cargar los empleados al montar el componente
  useEffect(()=>{
    fetchEmployers();
  },[]);
  return(<>
    {actionButton}
    <Modal show={showModalDelete} onHide={toggleShowModalDelete}>
          <ModalDeleteProfile
              title="Eliminar Empleado"
              refresh={refresh}
              toggle={toggleShowModalDelete}
              item={selectItem}
              itemView=""
              delete={disableUserByEmployerId}
            />
        </Modal>
      <ModalSeeProfileDetails show={showModalSeeDetails} setShow={setShowModalSeeDetails} item={selectItem}/>
  
    <div className="container-lg">
      <div className='d-flex justify-content-between align-items-center mt-3'>
        <h1>Administador de perfiles</h1>
        <button className='btn btn-success' onClick={handleButton}>Añadir</button>
      </div>
      <div className="row">
        <section className='d-flex flex-column col-md-12 col-10 text-center mx-auto d-flex'>
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
          > 
            <button className="btn p-0 btn_table w-100" name='edit' onClick={()=>{setActionButton("edit")}}>Editar <i className="bi bi-pencil-square"></i></button>
            <button className="btn p-0 btn_table w-100" name='delete' onClick={()=>{setActionButton("delete")}}>Eliminar <i className="bi bi-calendar-x-fill"></i></button>
            <button className="btn p-0 btn_table w-100" name='seeDetails' onClick={()=>{setActionButton("seeDetails")}}>Ver Detalles <i className="bi bi-eye"></i></button>
            <button className="btn p-0 btn_table w-100" name='resetPassword' onClick={()=>{setActionButton("resetPassword")}}>Blanquear contraseña <i className="bi bi-envelope-at-fill"></i></button>
          </CustomTable>
        </section>
      </div>
    </div> 
    </>
  );
}
