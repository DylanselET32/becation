import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { editRole, getRoleById } from '../../services/roleServices';
import { formatDateToString } from '../../helpers/misc/dateUtils';
import { compareObjects } from '../../helpers/misc/objectsUtils';
import { useAlert } from '../../contexts/AlertContext';
import { getAllEmployers } from '../../services/employeeServices';
import Select from "react-select";

export default function ModalEditRole({ item, show, setShow, refresh }) {
  const [errorMsg, setErrorMsg] = useState();
  const [fetchData, setFetchData] = useState();
  const [roleToEdit, setRoleToEdit] = useState(null)
  const [loaded, setLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false); useState
  const { alertConfig, setAlertConfig } = useAlert(); // Usa el contexto alert
  const [selectedEmployerId, setSelectedEmployerId] = useState(null);

  const handleClose = () => {
    setShow(false)
    setErrorMsg(null)
    setFetchData(null)
    setRoleToEdit(null)
    setLoaded(false)
    setIsSaving(false)
  };

  const fetch = async () => {
    try {
      if (!item) { return }
      setLoaded(false)
      const role = await getRoleById(item?.id)
      if (role.status != 200) { throw new Error(role.data.message || role.data.error) }
      
      
      setFetchData({ role: role.data})
      setRoleToEdit(role.data)
      setLoaded(true)
    } catch (error) {
      console.error(error)
      setErrorMsg(error.message)
    }

  }
 
  const isChanged = () => {
    const roleEdited = compareObjects(fetchData?.role, roleToEdit)
    return (Object.keys(roleEdited).length > 0)
  }
  const handleInput = (e) => {
    setErrorMsg("")
    const { name, value } = e.target
    setRoleToEdit({ ...roleToEdit, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true)
    try {
      const roleEdited = compareObjects(fetchData.role, roleToEdit)
      console.log(roleEdited)
      if (isChanged()) {

        const save = await editRole(roleEdited, fetchData.role.id)
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
          <Modal.Title>Editar Rol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              <span className="fw-bold">¡Error! </span>
              {errorMsg}
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name='role_name'
                disabled={!loaded}
                value={(loaded && roleToEdit) ? roleToEdit?.role_name : "Cargando..."}
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
          {!isSaving ? 'Guardar' : 'Guardando...'}
        </Button>
      </Modal.Footer>
    </Modal >
    </>
  );
}
