import React, {useState} from 'react'
import { Button, ModalHeader, ModalBody, ModalFooter, Spinner } from 'react-bootstrap';


export default function DenyVacationBody(props){

  const [canDeny, setCanDeny] = useState(false)
  const [isDenying, setIsDenying] = useState(false)
  const [errorMessage,setErrorMessage] = useState(false)

  const handleDenyField = (e) => {
    setCanDeny(!canDeny)
  }

  const denyRequest = async (id) => {
    setIsDenying(true)
    try {
        await props.deny(id)
        props.toggle()
        setIsDenying(false)
        props.refresh()
    } catch (error) {
        console.error(error)
        setIsDenying(false); // Asegúrate de detener el spinner
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
        <p>Estas seguro que deseas denegar la vacacion?"<span className="text-nowrap fw-bold">{props.item?.start_date} - {props.item?.end_date}"</span></p>
        <p><span className="text-danger">Esta acción no se puede deshacer.</span></p>
          <input
            id="check"
            name="check"
            type="checkbox"
            onChange={handleDenyField}
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
                                disabled={isDenying}
                                className="mx-2"
                            >
                                Cancelar
                            </Button>
                        </div>
                    </div>
                    <div className="col-6">
                        <Button
                            className="btn-danger"
                            onClick={() => denyRequest(props.item.id)}
                            disabled={isDenying || !canDeny}
                        >
                            {isDenying ? <div>Aprobando... <Spinner animation="border" variant="light" size="sm" /></div> : props.title.split(' ')[0]}
                        </Button>
                    </div>
                </div>

      </ModalFooter>
        </>
  )
}


