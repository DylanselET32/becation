import "../stylesheets/configprofile.css"
import { useNavigate } from 'react-router-dom';
import { editEmployerById, getEmployerById } from '../services/employeeServices';
import { useState, useEffect } from "react";
import { useAlert } from '../contexts/AlertContext'
import { compareObjects } from '../helpers/misc/objectsUtils'
import { useParams } from "react-router-dom";

export default function ProfileConfig({}) {

  const initialFilds = {
    name: '',
    surname: '',
    password: '',
    email: '',
    dni: '',
    privileges: '',
    role_id: '',
    area_id: '',
    avaible_days: '',
    total_days: '',
    is_acumulative: '',
    contrat_day: '',
    sign_up_date: '',
    // Otros campos de perfil
  }

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState();
  const { alertConfig, setAlertConfig } = useAlert(); // Usa el contexto alert
  const [fetchData, setFetchData] = useState();
  const [employerToEdit, setEmployerToEdit] = useState(initialFilds)
  const [loaded, setLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const params = useParams()

  const handleClose = () => {
    setErrorMsg(null)
    setFetchData(null)
    setEmployerToEdit(initialFilds)
    setLoaded(false)
    setIsSaving(false)
    navigate(-1)
  };

  const fetch = async () => {
    try {
      setLoaded(false)
      const profile = await getEmployerById(params?.id)
      if (profile.status != 200) { throw new Error(profile.data.message || profile.data.error) }
      setFetchData(profile.data)
      setEmployerToEdit(profile.data)
      setLoaded(true)
    } catch (error) {
      console.error(error)
      setAlertConfig({
        show: true,
        status: 'danger',
        title: 'Error',
        message: `Hubo un error al traer los datos ${error.message}`,
      });
    }
  }

  const isChanged = ()=>{
    const employerEdited  = compareObjects(fetchData,employerToEdit)
    return (Object.keys(employerEdited).length > 0)
  }

  //Este const maneja los cambios a realizar en el perfil
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployerToEdit({ ...employerToEdit, [name]: value });
  };

  //Este refresh es para llamar al fetch
  const refresh = ()=>{
    fetch()
  }

  //Esta const guarda los cambios en el perfil
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true)
    try {
      const employerEdited = compareObjects(fetchData, employerToEdit)
      if (isChanged()) {
        const save = await editEmployerById(employerEdited, fetchData.id)
        if (save.status == 200) {
          setAlertConfig({
            show: true,
            status: 'success',
            title: 'Guardado',
            message: `Se han guardado los cambios`,
          });

          refresh()
          handleClose()
        } else {
          throw new Error("ErrBackend", save.data?.error || save.data?.message)
        }

      }
    } catch (error) {
      console.error(error)
      setErrorMsg(`Error al guardar,${error.message}`)
    } finally {
      setIsSaving(false)
    }

  };

  useEffect(() => {
    fetch()
  }, [])

  return (<>
    <main>
      <div className="container">
      {errorMsg && (
        <div className="alert alert-danger" role="alert">
          <span className="fw-bold">¡Error! </span>
          {errorMsg}
        </div>
      )}
        <header>Configuración de Usuario</header>
        <form action="#">
          <div className="form">
            <div className="details personal">
              <span className="title">Datos Personales</span>
              <div className="fields">
                <div className="input-field">
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="name"
                    value={employerToEdit?.name} />
                </div>
                <div className="input-field">
                  <label htmlFor="surname">Apellido</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="surname"
                    value={employerToEdit?.surname} />
                </div>
                <div className="input-field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={employerToEdit?.email} />
                </div>
                <div className="input-field">
                  <label htmlFor="dni">Dni</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="dni"
                    value={employerToEdit?.dni} />
                </div>
                <div className="input-field">
                  <label htmlFor="privileges">Privileges</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="privileges"
                    value={employerToEdit?.privileges} />
                </div>
                <div className="input-field">
                  <label htmlFor="role">Rol</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="role"
                    value={employerToEdit?.role_id} />
                </div>
              </div>
            </div>
            <div className="details cuenta">
              <span className="title">Datos de Cuenta</span>
              <div className="fields">
                <div className="input-field">
                  <label htmlFor="area">Area</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="area"
                    value={employerToEdit?.area_id} />
                </div>
                <div className="input-field">
                  <label htmlFor="available_days">Available Days</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="avaible_days"
                    value={employerToEdit?.avaible_days} />
                </div>
                <div className="input-field">
                  <label htmlFor="total_days">Total Days</label>
                  <input
                    type="mail"
                    onChange={handleChange}
                    name="total_days"
                    value={employerToEdit?.total_days} />
                </div>
                <div className="input-field">
                  <label htmlFor="is_cumulative">Is Acumulative</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="is_acumulative"
                    value={employerToEdit?.is_acumulative} />
                </div>
                <div className="input-field">
                  <label htmlFor="contrat_day">Contrat Day</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="contrat_day"
                    value={employerToEdit?.contrat_day} />
                </div>
                <div className="input-field">
                  <label htmlFor="sign_up_date">Sign In Up</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="sign_up_date"
                    value={employerToEdit?.sign_up_date} />
                </div>
              </div>
              <button className="Btn">
                <span className="btnText" onClick={handleSubmit} disabled={isSaving || !isChanged()}>{!isSaving?'Guardar cambios':'Guardando...'}</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </main>


  </>)

}   