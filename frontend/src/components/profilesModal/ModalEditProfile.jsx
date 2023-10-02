import React, { useState,useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { editEmployer, getEmployerById } from '../../services/employeeServices';
import { formatDateToString } from '../../helpers/misc/dateUtils';
import { compareObjects } from '../../helpers/misc/objectsUtils';
import { useAlert } from '../../contexts/AlertContext';

export default function ModalEditVacation({ item, show, setShow,refresh }) {
  const [errorMsg,setErrorMsg] = useState();
  const [fetchData,setFetchData] = useState();
  const [employeeToEdit,setEmployeeToEdit] = useState()
  const [loaded, setLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);useState
  const { alertConfig,setAlertConfig } = useAlert(); // Usa el contexto alert

  const handleClose = () => {
    setShow(false)
    setErrorMsg(null)
    setFetchData(null)
    setEmployeeToEdit(null)
    setLoaded(false)
    setIsSaving(false)
  };
  
  const fetch = async ()=>{
    try {
      setLoaded(false)
      const employee = await getEmployerById(item?.id)
      if(employee.status != 200){throw new Error(employee.data.message || employee.data.error)}
      setFetchData(employee.data)
      setEmployeeToEdit(employee.data)
      setLoaded(true)
    } catch (error) {
      console.error(error)
      setErrorMsg(error.message)
    }

  }

  const isChanged = ()=>{
    const employeeEdited  = compareObjects(fetchData,employeeToEdit)
    return (Object.keys(employeeEdited).length > 0)
  }
  const handleInput = (e)=>{
      setErrorMsg("")
      const {name,value} = e.target
      const valueToSet = `${value}`
     setEmployeeToEdit({ ...employeeToEdit, [name] : valueToSet })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true)
    try {
      const employeeEdited  = compareObjects(fetchData,employeeToEdit)
      if(isChanged()){
        
          const save = await editEmployer(employeeEdited,fetchData.id)
          if(save.status == 200){
            setAlertConfig({
              show: true,
              status: 'success',
              title: 'Guardado',
              message: `Se han guardado los cambios`,
            }); 
          refresh()
          handleClose()
          }else{
            throw new Error("ErrBackend",save.data?.error || save.data?.message)
          }
        
      }
    } catch (error) {
      console.error(error)
      setErrorMsg(`Error al guardar,${error.message}`)
    }finally{
      setIsSaving(false)
    }

   };

  useEffect(()=>{
    fetch()
  },[item])
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              <span className="fw-bold">¡Error! </span>
              {errorMsg}
            </div>
          )}
          <Form>
            <Form.Group controlId="formStartDate">
              <Form.Label>Fecha de Inicio</Form.Label>
              <Form.Control
                type="date"
                name='start_date'
                disabled={!loaded}
                value={(loaded && employeeToEdit)?formatDateToString(employeeToEdit.start_date) :"Cargando..."}
                onInput={handleInput}
                />
            </Form.Group>

            <Form.Group controlId="formEndDate">
              <Form.Label>Fecha de Fin</Form.Label>
              <Form.Control
                type="date"
                name='end_date'
                disabled={!loaded}
                value={(loaded && employeeToEdit)?formatDateToString(employeeToEdit.end_date):"Cargando..."}
                onInput={handleInput}
              />
            </Form.Group>
          </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isSaving}>
            Cerrar
          </Button>
          <Button variant="success" onClick={handleSubmit} disabled={isSaving || !isChanged()}>
           {!isSaving?'Guardar':'Guardando...'} 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}