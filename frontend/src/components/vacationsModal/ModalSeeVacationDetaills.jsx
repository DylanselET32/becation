import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ModalSeeVacationDetails({ item, show, setShow }) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de vacación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          {item?.note && <div class="alert alert-warning" role="alert">
            <h5 class="alert-heading">Nota pendiente:</h5>
            <hr />
            {item?.note}
          </div>}
            <p><span className='fw-bold'>Codigo de solicitud:</span> {item?.id}</p>
            <p><span className='fw-bold'>Fecha de Inicio:</span> {item?.start_date}</p>
            <p><span className='fw-bold'>Fecha de Fin:</span> {item?.end_date}</p>
            <p><span className='fw-bold'>Fecha de Solicitud:</span> {item?.date_asked}</p>
            <p><span className='fw-bold'>Estado:</span> {item?.status}</p>
            <p><span className='fw-bold'>Autorización del Gerente:</span> {item?.area_manager_authorization == 1?"Autorizada":item?.area_manager_authorization == 0?"Rechazada":"Pendiente de aprobación"}</p>
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
