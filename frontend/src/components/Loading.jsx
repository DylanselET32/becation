import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1>Cargando...</h1>
      <Spinner animation="border" variant="dark" />
    </div>
  );
}

