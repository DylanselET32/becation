import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addRole } from '../../services/roleServices'; // Importa la función para agregar Rols
import { useAlert } from '../../contexts/AlertContext';
import Select from "react-select";
import { getAllEmployers } from '../../services/employeeServices';

export default function ModalAddRole({ show, setShow, refresh }) {
  const [errorMsg, setErrorMsg] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const { alertConfig, setAlertConfig } = useAlert();
  const [newRole, setNewRole] = useState({ role_name: ''}); // Agrega un nuevo estado para los datos del Rol


  const handleClose = () => {
    setShow(false);
    setErrorMsg(null);
    setIsSaving(false);
    setNewRole({ role_name: ''}); // Restablece los valores al cerrar el modal
  };


  const handleInput = (e) => {
    setErrorMsg('');
    const { name, value } = e.target;
    setNewRole({ ...newRole, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await addRole(newRole); // Llama a la función para agregar Rols
      if (response.status === 200) {
        setAlertConfig({
          show: true,
          status: 'success',
          title: 'Guardado',
          message: 'Se ha agregado un nuevo Rol con éxito.',
        });
        refresh();
        handleClose();
      } else {
        throw new Error('Error del back al guardar el Rol.');
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(`Error al guardar: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Rol</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMsg && (
          <div className="alert alert-danger" role="alert">
            <span className="fw-bold">¡Error! </span>
            {errorMsg}
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formRoleName">
            <Form.Label>Nombre del Rol</Form.Label>
            <Form.Control
              type="text"
              name="role_name"
              value={newRole.role_name}
              onChange={handleInput}
              placeholder="Ingrese el nombre del Rol"
              disabled={isSaving}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isSaving}>
          Cerrar
        </Button>
        <Button variant="success" onClick={handleSubmit} disabled={isSaving || !newRole.role_name }>
          {!isSaving ? 'Guardar' : 'Guardando...'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
