import React, {useState} from 'react'
import { Button, ModalHeader, ModalBody, ModalFooter, Spinner } from 'react-bootstrap';


export default function AproveVacationBody(props){

  const [canAprove, setCanAprove] = useState(false)
  const [isAproving, setIsAproving] = useState(false)
  const [errorMessage,setErrorMessage] = useState(false)

  const handleAproveField = (e) => {
    setCanAprove(!canAprove)
  }

  const aproveRequest = async (id) => {
    setIsAproving(true)
    try {
        await props.aprove(id)
        props.toggle()
        setIsAproving(false)
        props.refresh()
    } catch (error) {
        console.error(error)
        setIsAproving(false); // Asegúrate de detener el spinner
        setErrorMessage('Error al eliminar la vacación'); // Nuevo estado para el mensaje de error
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
        <p>Estas seguro que deseas aprobar la vacacion "<span className="text-nowrap fw-bold">{props.item?.start_date} - {props.item?.end_date}"</span></p>
        <p><span className="text-danger">Esta acción no se puede deshacer.</span></p>
          <input
            id="check"
            name="check"
            type="checkbox"
            onChange={handleAproveField}
            autoComplete="off"
            className="me-2"
            />
          <label  htmlFor="check"> Haga click para proceder</label>
      </ModalBody>
      <ModalFooter>
                <div className="row col-12">
                    <div className="col-6">
                        <div className="d-flex justify-content-end">
                            <Button
                                onClick={props.toggle}
                                disabled={isAproving}
                                className="mx-2"
                            >
                                Cancelar
                            </Button>
                        </div>
                    </div>
                    <div className="col-6">
                        <Button
                            className="btn-danger"
                            onClick={() => aproveRequest(props.item.id)}
                            disabled={isAproving || !canAprove}
                        >
                            {isAproving ? <div>Aprobando... <Spinner animation="border" variant="light" size="sm" /></div> : props.title.split(' ')[0]}
                        </Button>
                    </div>
                </div>

      </ModalFooter>
        </>
  )
}


