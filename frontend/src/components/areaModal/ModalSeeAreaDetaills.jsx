import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getAllEmployers } from '../../services/employeeServices';
import { formatDateToString } from '../../helpers/misc/dateUtils';

export default function ModalSeeAreaDetails({ item, show, setShow }) {
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
  

  useEffect(()=>{fetch()},[])
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del area</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p><span className='fw-bold'>Codigo de Area:</span> {item?.id}</p>
            <p><span className='fw-bold'>Nombre del area:</span> {item?.area}</p>
            <p><span className='fw-bold'>Jefe del area:</span> {`${item?.name} ${item?.surname}`}</p>
            <p><span className='fw-bold'>Email del Jefe:</span> {`${users.find(u => u.user_id == item?.area_manager)?.email}`}</p>
            <p><span className='fw-bold'>Fecha de creacion:</span> {item?.to_create}</p>
            <p><span className='fw-bold'>Ultima Modificacion:</span> {item?.to_update_date&&formatDateToString(item?.to_update_date, 'DD/MM/YYYY hh:mm:ss') }</p>
            <p>
              <span className='fw-bold'>Modificado por:</span> {item?.to_update == 0 
                ? "No Modificado" 
                :`${users.find(u => u.user_id == item?.to_update)?.name} ${users.find(u => u.user_id == item?.to_update)?.surname}`}
            </p>
            {/* Agrega más detalles según sea necesario */}
          </div>
        </Modal.Body>
        <Modal.Footer className="">
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
