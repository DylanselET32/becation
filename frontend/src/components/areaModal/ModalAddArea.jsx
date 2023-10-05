import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addArea } from '../../services/areaServices'; // Importa la función para agregar áreas
import { useAlert } from '../../contexts/AlertContext';
import Select from "react-select";
import { getAllEmployers } from '../../services/employeeServices';

export default function ModalAddArea({ show, setShow, refresh }) {
  const [errorMsg, setErrorMsg] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const { alertConfig, setAlertConfig } = useAlert();
  const [newArea, setNewArea] = useState({ area: '', area_manager: null }); // Agrega un nuevo estado para los datos del área
  const [fetchData, setFetchData] = useState();
  const [loaded, setLoaded] = useState(false);



  const fetch = async () => {
    try {
      setLoaded(false)
      console.log("FETCH DATA")
      const employers = await getAllEmployers()
      if (employers.status != 200) { throw new Error(employers.data.message || employers.data.error) }

      const employersOrder = employers.data.map(employer => ({
        value: employer.id,
        label: `${employer.name} ${employer.surname}`,
      }));
      setFetchData({employers: employersOrder})
      setLoaded(true)
    } catch (error) {
      console.error(error)
      setErrorMsg(error.message)
    }

  }

  const handleClose = () => {
    setShow(false);
    setErrorMsg(null);
    setIsSaving(false);
    setLoaded(false)
    setFetchData(null)
    setNewArea({ area: '', area_manager: null }); // Restablece los valores al cerrar el modal
  };

  const handleSelectChange = (selectedOption) => {
    setNewArea({ ...newArea, area_manager: selectedOption.value });
  };

  const handleInput = (e) => {
    setErrorMsg('');
    const { name, value } = e.target;
    setNewArea({ ...newArea, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await addArea(newArea); // Llama a la función para agregar áreas
      if (response.status === 200) {
        setAlertConfig({
          show: true,
          status: 'success',
          title: 'Guardado',
          message: 'Se ha agregado un nuevo área con éxito.',
        });
        refresh();
        handleClose();
      } else {
        throw new Error('Error al guardar el área.');
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(`Error al guardar: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };
  useEffect(() => {
    if(show){
      fetch()
    }
  }, [show])
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Área</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMsg && (
          <div className="alert alert-danger" role="alert">
            <span className="fw-bold">¡Error! </span>
            {errorMsg}
          </div>
        )}
        <Form>
          <Form.Group controlId="formAreaName">
            <Form.Label>Nombre del Área</Form.Label>
            <Form.Control
              type="text"
              name="area"
              value={newArea.area}
              onChange={handleInput}
              placeholder={loaded ? "Ingrese el nombre del área" : "Cargando..."}
              disabled={!loaded}
            />
          </Form.Group>

          <Form.Group controlId="formAreaManager">
            <Form.Label>Jefe de Área</Form.Label>
            <Select
              options={fetchData?.employers}
              isDisabled={!loaded}
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
        <Button variant="success" onClick={handleSubmit} disabled={isSaving || !newArea.area || !newArea.area_manager}>
          {!isSaving ? 'Guardar' : 'Guardando...'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
