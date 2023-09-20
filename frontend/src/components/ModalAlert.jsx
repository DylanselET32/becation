import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useAlert } from '../contexts/AlertContext';

function ModalAlert() {
  const { alertConfig, setAlertConfig } = useAlert();

  return (
    <Alert
      show={alertConfig.show}
      variant={alertConfig.status}
      style={{
        position: 'fixed',
        top: 10,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        maxWidth: '400px', // Ajusta el ancho máximo según tu preferencia
        width: '100%',
      }}
    >
      <Alert.Heading>{alertConfig.title}</Alert.Heading>
      <p>{alertConfig.message}</p>
      <hr />
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => setAlertConfig({ show: false })}
          variant={alertConfig.status === 'success' ? 'outline-success' : 'outline-danger'}
        >
          Aceptar
        </Button>
      </div>
    </Alert>
  );
}

export default ModalAlert;
