import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getAllEmployers } from '../../services/employeeServices';
import { formatDateToString } from '../../helpers/misc/dateUtils';

export default function ModalSeeProfileDetails({ item, show, setShow }) {
  const handleClose = () => setShow(false);
  const [users,setUsers] = useState([])

  const fetch = async ()=>{
    try {
      const users = await getAllEmployers()
      console.log(users)
      setUsers(users.data)
      
    } catch (error) {
      console.error(error)

    }
  }

  useEffect(() => {
    fetch()
    console.log(item)
  },[item])

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p><span className='fw-bold'>Codigo de empleado:</span> {item?.id}</p>
            <p><span className='fw-bold'>Nombre:</span> {item?.name}</p>
            <p><span className='fw-bold'>Apellido:</span> {item?.surname}</p>
            <p><span className='fw-bold'>Email:</span> {item?.email}</p>
            <p><span className='fw-bold'>DNI:</span> {item?.dni}</p>
            <p><span className='fw-bold'>Area:</span> {item?.area}</p>
            <p><span className='fw-bold'>Rol:</span> {item?.role_name}</p>
            <p><span className='fw-bold'>Días totales:</span> {item?.total_days}</p>
            <p><span className='fw-bold'>Días disponibles:</span> {item?.available_days}</p>
            <p><span className='fw-bold'>Vacaciones acumulables:</span> {item?.is_cumulative == 0 ? "No":"Si"}</p>
            <p><span className='fw-bold'>Nivel de privilegios:</span> {item?.privileges}</p>
            <p><span className='fw-bold'>Fecha de creacion:</span> {item?.to_create&&formatDateToString(item?.to_create, 'DD/MM/YYYY hh:mm:ss')}</p>
            <p><span className='fw-bold'>Fecha de contratación:</span> {item?.sign_up_date&&formatDateToString(item?.sign_up_date, 'DD/MM/YYYY')}</p>
            <p><span className='fw-bold'>Ultima Modificacion:</span> {item?.to_update_date&&formatDateToString(item?.to_update_date, 'DD/MM/YYYY hh:mm:ss') }</p>
            <p><span className='fw-bold'>Modificado por:</span> {item?.to_update == 0 ? "No Modificado":`${users.find(u => u.user_id == item?.to_update)?.name} ${users.find(u => u.user_id == item?.to_update)?.surname}`}</p>
            {/* Agrega más detalles según sea necesario */}
          </div>
        </Modal.Body>
        <Modal.Footer className="text-align-left justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
