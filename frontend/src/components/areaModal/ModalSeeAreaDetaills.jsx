import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getAllEmployers } from '../../services/employeeServices';

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
            <p><span className='fw-bold'>Jefe del area:</span> {item?.area_manager}</p>
            <p><span className='fw-bold'>Fecha de creacion:</span> {item?.to_create}</p>
            <p><span className='fw-bold'>Ultima Modificacion:</span> {item?.to_update_date}</p>
            <p>
              <span className='fw-bold'>Modificado por:</span> {item?.to_update == 0 
                ? "No Modificado" 
                : users.find(u => u.user_id == item?.to_update)?.name}
            </p>
            {/* Agrega más detalles según sea necesario */}
          </div>
        </Modal.Body>
        <Modal.Footer className="text-align-left justify-content-between">
        <span className={`badge fs-5 ${
          item?.status== "Aprobado"?'bg-success':
          item?.status== "Denegado"?'bg-danger':
          item?.status== "En Evaluación"?'bg-warning':'bg-secondary'
        }`}>{item?.status}</span>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
