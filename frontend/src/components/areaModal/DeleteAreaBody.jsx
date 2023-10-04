import React, { useState } from "react"
import { Button, ModalHeader, ModalBody, ModalFooter, Spinner } from 'react-bootstrap';

export default function DeleteVacationBody(props) {
    const [canDelete, setCanDelete] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [errorMessage,setErrorMessage] = useState(false)

    const handleChange = (e) => {
        e.preventDefault();
    };

    const handleDeleteField = (e) => {
        setCanDelete(!canDelete)
    }

    const deleteRequest = async (id) => {
        setIsDeleting(true)
        try {
            await props.delete(id)
            props.toggle()
            setIsDeleting(false)
            props.refresh()
        } catch (error) {
            console.error(error)
            setIsDeleting(false); // Asegúrate de detener el spinner
            setErrorMessage('Error al eliminar el area'); // Nuevo estado para el mensaje de error
        }
    }

    return (
        <>
            
            <ModalHeader toggle={props.toggle} closeButton>
                <h3>{props.title}</h3>
            </ModalHeader>
            <ModalBody>
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
                <p>Estas seguro que deseas eliminar el area "<span className="text-nowrap fw-bold">{props.item.area}"</span></p>
                <p><span className="text-danger">Esta acción no se puede deshacer.</span></p>
                <input
                    id="check"
                    name="check"
                    type="checkbox"
                    onChange={handleDeleteField}
                    autoComplete="off"
                    className="me-2"
                />
                <label  for="check"> Haga click para proceder</label>
            </ModalBody>
            <ModalFooter>
                <div className="row col-12">
                    <div className="col-6">
                        <div className="d-flex justify-content-end">
                            <Button
                                onClick={props.toggle}
                                disabled={isDeleting}
                                className="mx-2"
                            >
                                Cancelar
                            </Button>
                        </div>
                    </div>
                    <div className="col-6">
                        <Button
                            className="btn-danger"
                            onClick={() => deleteRequest(props.item.id)}
                            disabled={isDeleting || !canDelete}
                        >
                            {isDeleting ? <div>Eliminando... <Spinner animation="border" variant="light" size="sm" /></div> : props.title.split(' ')[0]}
                        </Button>
                    </div>
                </div>

            </ModalFooter>
        </>
    );
}

