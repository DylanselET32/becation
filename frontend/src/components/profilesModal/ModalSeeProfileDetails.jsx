import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ModalSeeProfileDetails({ item, show, setShow }) {
  const handleClose = () => setShow(false);

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
            <p><span className='fw-bold'>Fecha de creacion:</span> {item?.to_create}</p>
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
