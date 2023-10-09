import "../stylesheets/configprofile.css";
import { useNavigate } from "react-router-dom";
import {
  editEmployerById,
  getEmployerById,
} from "../services/employeeServices";
import { useState, useEffect } from "react";
import { useAlert } from "../contexts/AlertContext";
import { compareObjects } from "../helpers/misc/objectsUtils";
import { formatDateToString } from '../helpers/misc/dateUtils';
import { useParams } from "react-router-dom";
import { getAllAreas } from "../services/areaServices";
import Select from "react-select";
import { getAllRoles } from "../services/roleServices";

export default function ProfileConfig({ auth }) {
  const initialFilds = {
    name: "",
    surname: "",
    password: "",
    email: "",
    dni: "",
    privileges: "",
    role_id: "",
    area_id: "",
    available_days: "",
    total_days: "",
    is_cumulative: "",
    contrat_day: "",
    // Otros campos de perfil
  };

  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState();
  const { alertConfig, setAlertConfig } = useAlert(); // Usa el contexto alert
  const [fetchData, setFetchData] = useState();
  const [employerToEdit, setEmployerToEdit] = useState(initialFilds);
  const [loaded, setLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const params = useParams();

  useEffect(() => {
    const isNotLoginPage = location.pathname !== "/login";
    if (!auth.user && isNotLoginPage) {
      navigate("/login");
    }
  }, [auth, navigate]);

  const handleClose = () => {
    setErrorMsg(null);
    setFetchData(null);
    setEmployerToEdit(initialFilds);
    setLoaded(false);
    setIsSaving(false);
    navigate(-1);
  };

  const fetch = async () => {
    try {
      setLoaded(false);
      const profile = await getEmployerById(params?.id);
      if (profile.status != 200) {
        throw new Error(profile.data.message || profile.data.error);
      }
      const areas = await getAllAreas()
      if (areas.status != 200) { throw new Error(areas.data.message || areas.data.error) }

      const areasOrder = areas.data.map(area => ({
        value: area.id,
        label: area.area
      }));

      const roles = await getAllRoles()
      if (roles.status != 200) { throw new Error(roles.data.message || roles.data.error) }

      const rolesOrder = roles.data.map(role => ({
        value: role.id,
        label: role.role_name
      }));

      setFetchData({profile:profile.data,areas:areasOrder,roles:rolesOrder});
      setEmployerToEdit(profile.data);
      setLoaded(true);
    } catch (error) {
      console.error(error);
      setAlertConfig({
        show: true,
        status: "danger",
        title: "Error",
        message: `Hubo un error al traer los datos ${error.message}`,
      });
    }
  };

  const handleSelectChangeAreas = (selectedOption) => {
    setEmployerToEdit({ ...employerToEdit, area_id: selectedOption.value });
  };
  const handleSelectChangeRoles = (selectedOption) => {
    setEmployerToEdit({ ...employerToEdit, role_id: selectedOption.value });
  };

  const isChanged = () => {
    const employerEdited = compareObjects(fetchData?.profile, employerToEdit);
    return Object.keys(employerEdited).length > 0;
  };

  //Este const maneja los cambios a realizar en el perfil
  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name == 'sign_up_date'){
      setEmployerToEdit({ ...employerToEdit, [name]: `${value}T00:00:00` });
    }else{
      setEmployerToEdit({ ...employerToEdit, [name]: value });
    }
  };

  //Este refresh es para llamar al fetch
  const refresh = () => {
    fetch();
  };

  //Esta const guarda los cambios en el perfil
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const employerEdited = compareObjects(fetchData?.profile, employerToEdit);
      if (isChanged()) {

        const save = await editEmployerById(employerEdited, fetchData.profile.id);
        if (save.status == 200) {
          setAlertConfig({
            show: true,
            status: "success",
            title: "Guardado",
            message: `Se han guardado los cambios`,
          });

          refresh();
          handleClose();
        } else {
          throw new Error("ErrBackend", save.data?.error || save.data?.message);
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(`Error al guardar,${error.message}`);
    } finally {
      setIsSaving(false);
    }

  };


  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
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
                      value={employerToEdit?.name}
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="surname">Apellido</label>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="surname"
                      value={employerToEdit?.surname}
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      onChange={handleChange}
                      name="email"
                      value={employerToEdit?.email}
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="dni">Dni</label>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="dni"
                      value={employerToEdit?.dni}
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="privileges">Nivel de Privilegios</label>
                    <input
                      type="number"
                      min={0}
                      onChange={handleChange}
                      name="privileges"
                      value={employerToEdit?.privileges}
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="role">Rol</label>
                    <Select
                      options={fetchData?.roles}
                      isDisabled={!loaded}
                      value={(loaded && fetchData?.roles)?fetchData.roles.find(option => option.value == employerToEdit.role_id) : null}
                      onChange={handleSelectChangeRoles}
                      placeholder={loaded ? "Seleccione un jefe de área" : "Cargando..."}
                    />
                  </div>
                </div>
              </div>
              <div className="details cuenta">
                <span className="title">Datos de Cuenta</span>
                <div className="fields">
                  <div className="input-field">
                    <label htmlFor="area">Area</label>
                    <Select
                      options={fetchData?.areas}
                      isDisabled={!loaded}
                      value={(loaded && fetchData?.areas)?fetchData.areas.find(option => option.value == employerToEdit.area_id) : null}
                      onChange={handleSelectChangeAreas}
                      placeholder={loaded ? "Seleccione un jefe de área" : "Cargando..."}
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="available_days">Días Hábiles</label>
                    <input
                      type="number"
                      min="0"
                      onChange={handleChange}
                      name="available_days"
                      value={employerToEdit?.available_days}
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="total_days">Días Totales</label>
                    <input
                      type="number"
                      min="0"
                      onChange={handleChange}
                      name="total_days"
                      value={employerToEdit?.total_days}
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="is_cumulative">Son Acumulables</label>
                    <select
                      className="form-control"
                      id="is_cumulative"
                      name="is_cumulative"
                      value={employerToEdit?.is_cumulative}
                      onChange={handleChange}
                    >
                      <option value="true">Sí</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                  <div className="input-field">
                    <label htmlFor="sign_up_date">Fecha de Contratacion</label>
                    <input
                      type="date"
                      onChange={handleChange}
                      name="sign_up_date"
                      isDisabled={!loaded}
                      value={(loaded && employerToEdit.sign_up_date)?formatDateToString(employerToEdit.sign_up_date) :"Cargando..."}
                    />
                  </div>
                </div>
                <button className="Btn">
                  <span
                    className="btnText"
                    onClick={handleSubmit}
                    disabled={isSaving || !isChanged()}
                  >
                    {!isSaving ? "Guardar cambios" : "Guardando..."}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
