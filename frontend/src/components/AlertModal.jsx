import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertModal({configure}) {
  return (
    <>
      <Alert show={configure.show} variant={configure.status}>
        <Alert.Heading>{configure.title}</Alert.Heading>
        <p>
          {configure.message}
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => configure.show = false} variant="outline-success">
            Aceptar
          </Button>
        </div>
      </Alert>
    </>
  );
}

export default AlertModal;