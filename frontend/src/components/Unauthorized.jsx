import React from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function Unauthorized({auth}) {
  return (
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <div className="text-center">
            <h1 className="display-4">Acceso no autorizado</h1>
            <p className="lead">No tienes permisos para acceder a esta página. Por favor, inicia sesión con una cuenta autorizada o comunícate con un administrador.</p>
            {auth.user?
            <>
            <p>Estas logeado como <span className="fw-bold">{auth.user?.name} {auth.user?.surname}</span></p>
            <Link to="/" className="btn btn-dark">Volver a la página de inicio</Link>
            </>:
            <>
            <p>Actualmente no estas logueado</p>
            <Link to="/login" className="btn btn-success">Iniciar Sesion</Link>
            </>
          }</div>
        </Col>
      </Row>
  );
}
