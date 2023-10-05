import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { editArea, getAreaById } from '../../services/areaServices';
import { formatDateToString } from '../../helpers/misc/dateUtils';
import { compareObjects } from '../../helpers/misc/objectsUtils';
import { useAlert } from '../../contexts/AlertContext';
import { getAllEmployers } from '../../services/employeeServices';
import Select from "react-select";

export default function ModalEditArea({ item, show, setShow, refresh }) {
  const [errorMsg, setErrorMsg] = useState();
  const [fetchData, setFetchData] = useState();
  const [areaToEdit, setAreaToEdit] = useState()
  const [loaded, setLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false); useState
  const { alertConfig, setAlertConfig } = useAlert(); // Usa el contexto alert
  const [selectedEmployerId, setSelectedEmployerId] = useState(null);

  const handleClose = () => {
    setShow(false)
    setErrorMsg(null)
    setFetchData(null)
    setAreaToEdit(null)
    setLoaded(false)
    setIsSaving(false)
  };

  const fetch = async () => {
    try {
      if (!item) { return }
      setLoaded(false)
      const area = await getAreaById(item?.id)
      if (area.status != 200) { throw new Error(area.data.message || area.data.error) }
      const employers = await getAllEmployers()
      if (employers.status != 200) { throw new Error(employers.data.message || employers.data.error) }

      const employersOrder = employers.data.map(employer => ({
        value: employer.id,
        label: `${employer.name} ${employer.surname}`,
      }));
      setFetchData({ area: area.data, employers: employersOrder})
      setAreaToEdit(area.data)
      setLoaded(true)
    } catch (error) {
      console.error(error)
      setErrorMsg(error.message)
    }

  }
  const handleSelectChange = (selectedOption) => {
    setAreaToEdit({ ...areaToEdit, area_manager: selectedOption.value })
  };
  const isChanged = () => {
    const areaEdited = compareObjects(fetchData?.area, areaToEdit)
    return (Object.keys(areaEdited).length > 0)
  }
  const handleInput = (e) => {
    setErrorMsg("")
    const { name, value } = e.target
    setAreaToEdit({ ...areaToEdit, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true)
    try {
      const areaEdited = compareObjects(fetchData.area, areaToEdit)
      console.log(areaEdited)
      if (isChanged()) {

        const save = await editArea(areaEdited, fetchData.area.id)
        if (save.status == 200) {
          setAlertConfig({
            show: true,
            status: 'success',
            title: 'Guardado',
            message: `Se a guardado los cambios`,
          });
          refresh()
          handleClose()
        } else {
          throw new Error("ErrBackend", save.data?.error || save.data?.message)
        }

      }
    } catch (error) {
      console.error(error)
      setErrorMsg(`Error al guardar,${error.message}`)
    } finally {
      setIsSaving(false)
    }

  };

  useEffect(() => {
    if(show){
      fetch()
    }
  }, [show,item])
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Area</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              <span className="fw-bold">¡Error! </span>
              {errorMsg}
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formStartDate">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name='area'
                disabled={!loaded}
                value={(loaded && areaToEdit) ? areaToEdit?.area : "Cargando..."}
                onInput={handleInput}
              />
            </Form.Group>

            <Form.Group controlId="formEndDate">
              <Form.Label>Jefe de área</Form.Label>
              
              <Select
                options={(loaded && fetchData.employers)&&fetchData['employers']}
                isDisabled={!loaded}
                value={(loaded && fetchData.employers)?fetchData['employers'].find(option => option.value == areaToEdit.area_manager) : null}
                onChange={handleSelectChange}
                placeholder={loaded ? "Seleccione un jefe de área" : "Cargando..."}
              />
              
            </Form.Group>
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isSaving}>
          Cerrar
        </Button>
        <Button variant="success" onClick={handleSubmit} disabled={isSaving || !isChanged()}>
          {!isSaving ? 'Guardar' : 'Guardando...'}
        </Button>
      </Modal.Footer>
    </Modal >
    </>
  );
}
