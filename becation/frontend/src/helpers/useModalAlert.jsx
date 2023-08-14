import { useState } from 'react';

const useModalAlert= ()=>{
  const [modalAlertResponse, setModalAlertResponse]= useState(false);
  const [alert , setAlert]= useState(false);

  const handleModalAlert= (e)=>{
    if(e.target.value == "X"){
      console.log("Operacion Cancelada")
      setModalAlertResponse(false)
      setAlert(false)
    }
  }
  const modalAlertCalled= {
    width: "30vw",
    minHeight: "4rem",
    position: "absolute",
    left:"0",
    right: "0",
    bottom: "0",
    margin: "0 auto",
    background: "#E54B4B", //#f4f4f8 PARA DARKMODE  //8797af otra opcion
    borderRadius: "20px",
    color: "#f4f4f8",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "2s"
  }

  const openModalAlert= ()=>{
    setAlert(true)   
    setTimeout(()=>{
      setAlert(false)   
    },3899)
  }

  return [modalAlertResponse, handleModalAlert, alert ,openModalAlert, modalAlertCalled]
}
export default useModalAlert;