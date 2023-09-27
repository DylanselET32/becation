import React, { useState,useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getVacationById } from '../../services/vacationService';

export default function ModalEditVacation({ item, show, setShow }) {
  const handleClose = () => setShow(false);
  const [errorMsg,setErrorMsg] = useState();
  const [fetchData,setFetchData] = useState();
  const [vacationToEdit,setVacationToEdit] = useState()
  const [loaded, setLoaded] = useState(false);

  const fetch = async ()=>{
    try {
      setLoaded(false)
      const vacation = await getVacationById(item?.id)
      if(vacation.status != 200){throw new Error(vacation.data.message || vacation.data.error)}
      console.log(vacation.data)
      //setFetchData(vacation)
      setVacationToEdit(vacation.data)
      setLoaded(true)
    } catch (error) {
      console.error(error)
      setErrorMsg(error.message)
    }

  }

  const handleInput = (e)=>{
      const {name,value} = e.target
     setVacationToEdit({ ...vacationToEdit, [name] : value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
     
   };

  useEffect(()=>{
    fetch()
  },[item])
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Vacación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMsg && (
            <div className="alert alert-warning" role="alert">
              <span className="fw-bold">¡Error! </span>
              {errorMsg}
            </div>
          )}
          <Form>
            <Form.Group controlId="formStartDate">
              <Form.Label>Fecha de Inicio</Form.Label>
              <Form.Control
                type="text"
                disabled={!loaded}
                value={(loaded && vacationToEdit)?vacationToEdit.start_date:"Cargando..."}
                onChange={handleInput}
              />
            </Form.Group>

            <Form.Group controlId="formEndDate">
              <Form.Label>Fecha de Fin</Form.Label>
              <Form.Control
                type="text"
                disabled={!loaded}
                value={(loaded && vacationToEdit)?vacationToEdit.end_date:"Cargando..."}
                onChange={handleInput}
              />
            </Form.Group>
          </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
