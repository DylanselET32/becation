import React, { useState,useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { editArea, getAreaById } from '../../services/areaServices';
import { formatDateToString } from '../../helpers/misc/dateUtils';
import { compareObjects } from '../../helpers/misc/objectsUtils';
import { useAlert } from '../../contexts/AlertContext';

export default function ModalEditArea({ item, show, setShow,refresh }) {
  const [errorMsg,setErrorMsg] = useState();
  const [fetchData,setFetchData] = useState();
  const [vacationToEdit,setAreaToEdit] = useState()
  const [loaded, setLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);useState
  const { alertConfig,setAlertConfig } = useAlert(); // Usa el contexto alert

  const handleClose = () => {
    setShow(false)
    setErrorMsg(null)
    setFetchData(null)
    setAreaToEdit(null)
    setLoaded(false)
    setIsSaving(false)
  };
  
  const fetch = async ()=>{
    try {
      if(!item){return}
      setLoaded(false)
      const area = await getAreaById(item?.id)
      if(area.status != 200){throw new Error(area.data.message || area.data.error)}
      setFetchData(area.data)
      setAreaToEdit(area.data)
      setLoaded(true)
    } catch (error) {
      console.error(error)
      setErrorMsg(error.message)
    }

  }

  const isChanged = ()=>{
    const vacationEdited  = compareObjects(fetchData,vacationToEdit)
    return (Object.keys(vacationEdited).length > 0)
  }
  const handleInput = (e)=>{
      setErrorMsg("")
      const {name,value} = e.target
      const valueToSet = `${value}T00:00:00`
     setAreaToEdit({ ...vacationToEdit, [name] : valueToSet })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true)
    try {
      const vacationEdited  = compareObjects(fetchData,vacationToEdit)
      if(isChanged()){
        
          const save = await editArea(vacationEdited,fetchData.id)
          if(save.status == 200){
            setAlertConfig({
              show: true,
              status: 'success',
              title: 'Guardado',
              message: `Se a guardado los cambios`,
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
          <Modal.Title>Editar Vacación</Modal.Title>
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
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name='area'
                disabled={!loaded}
                value={(loaded && vacationToEdit)?formatDateToString(vacationToEdit.start_date) :"Cargando..."}
                onInput={handleInput}
                />
            </Form.Group>

            <Form.Group controlId="formEndDate">
              <Form.Label>Fecha de Fin</Form.Label>
              <Form.Control
                type="date"
                name='end_date'
                disabled={!loaded}
                value={(loaded && vacationToEdit)?formatDateToString(vacationToEdit.end_date):"Cargando..."}
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
