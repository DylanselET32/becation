import React from "react";
import { Link } from "react-router-dom"; // Importa Link si estás utilizando React Router para enlaces internos
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function NotFound() {
  return (
    
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <div className="text-center">
            <h1 className="display-4">Página no encontrada</h1>
            <p className="lead">La página que estás buscando no existe. Verifica que este bien escrita o comunicate con un desarrollador</p>
            <Link to="/" className="btn btn-primary">Volver a la página de inicio</Link>
          </div>
        </Col>
      </Row>
    
  );
}
