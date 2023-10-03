import React, {useState} from 'react'
import { Button, ModalHeader, ModalBody, ModalFooter, Spinner, Form } from 'react-bootstrap';


const SendRevisionBody = (props) => {
  const [canSendRevision, setCanSendRevision] = useState(false)
  const [isSendingRevision, setIsSendingRevision] = useState(false)
  const [errorMessage,setErrorMessage] = useState(false)

  const handleRevisionField = (e) => {
    setCanSendRevision(!canSendRevision)
  }

  const sendToRevision = async (id) => {
    setIsSendingRevision(true)
    try {
        await props.sendRevision(id)
        props.toggle()
        setIsSendingRevision(false)
        props.refresh()
    } catch (error) {
        console.error(error)
        setIsSendingRevision(false); // Asegúrate de detener el spinner
        setErrorMessage('Error al eliminar la vacación'); // Nuevo estado para el mensaje de error
    }
}
    // props.handleNoteChange = (e, setState)=>{
    // setState(e.target.value)
  // }

  const [note, setNote] = useState("")

  const updateNoteState = (e) => {

    const newText = e.target.value;

    setNote(newText)
    props.handleNoteChange(newText);
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
        <p>Estas seguro que deseas mandar a revisión esta vacacion?"<span className="text-nowrap fw-bold">{props.item.start_date} - {props.item.end_date}"</span></p>
        <p><span className="text-danger">Esta acción no se puede deshacer.</span></p>
          <input
            id="check"
            name="check"
            type="checkbox"
            onChange={handleRevisionField}
            autoComplete="off"
            className="me-2"
            />
          <label  htmlFor="check"> Haga click para proceder</label>
          <Form>
            <Form.Group onChange={updateNoteState}  className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label><b>Escriba un comentario:</b></Form.Label>
              <Form.Control value={note} as="textarea" rows={4} name='note_revision'/>
            </Form.Group>
          </Form>
      </ModalBody>
      <ModalFooter>
                <div className="row col-12">
                    <div className="col-6">
                        <div className="d-flex justify-content-end">
                            <Button
                                onClick={props.toggle}
                                disabled={isSendingRevision}
                                className="mx-2"
                            >
                                Cancelar
                            </Button>
                        </div>
                    </div>
                    <div className="col-6">
                        <Button
                            className="btn-danger"
                            onClick={() => sendToRevision(props.item.id)}
                            disabled={isSendingRevision || !canSendRevision}
                        >
                            {isSendingRevision ? <div>Aprobando... <Spinner animation="border" variant="light" size="sm" /></div> : props.title.split(' ')[0]}
                        </Button>
                    </div>
                </div>

      </ModalFooter>
        </>
  )
        }


export default SendRevisionBody
