import {React} from "react";
import "../stylesheets/vacationAdministration.css"
import TableRow from "../components/TableRow";
import { useState, useEffect } from "react";
import {  getVacations, deleteVacation } from "../services/vacationService";
import { formatDateToString, operateDate } from "../helpers/misc/dateUtils";
import CustomTable from "../components/CustomTable";
import { Modal } from "react-bootstrap";
import DeleteVacationBody from "../components/vacationsModal/DeleteVacationBody";


export default function VacationManager(){

    const [vacationsAsked, setVacationsAsked] = useState([])
    const [selectItem, setSelectItem] = useState(null); // Estado que almacena el elemento seleccionado en la tabla
    const [actionButton, setActionButton] = useState(); // Estado que indica la acción a realizar
    const [fetchData, setFetchData] = useState([]);
    const [showModalSeeDetails,setShowModalSeeDetails] = useState(false); // Estado que controla al modal 
    const [showModalDelete,setShowModalDelete] = useState(false); // Estado que controla al modal deletevacation


    const toggleShowModalDelete = ()=>{setShowModalDelete(!showModalDelete)};

    const fetchVacations = async () => {
        try {

            setFetchData([])
            const vacations = await getVacations();
            if(vacations.status !== 200) throw new Error("Error de servidor, intentar más tarde");
            setFetchData(vacations.data);
     
        } catch (error) {
            setAlertConfig({
                show: true,
                status: 'danger',
                title: 'Error',
                message: `Hubo un error al cargar las vacaciones, ${error}`,
            });
        }
    };
    useEffect(()=>{
        fetchVacations();
    },[]);


    useEffect((e) => {
        switch (actionButton){
            case "edit":
                handleEditVacation(selectItem);
                break;
            case "delete":
                handleDeleteVacation(selectItem);
                break;
            case "seeDetails":
                handleSeeDetailsVacation(selectItem);
                break;

        }
    },[selectItem,actionButton]);

    const formatVacationsToTable = (vacations) => {
        let temporalVacations = [];
        const status = {
            aproved: "Aprobado",
            denied: "Denegado",
            revision: "En Evaluación",
            null: "Pendiente"
        };
    
        // Ordena las vacaciones por la fecha de inicio más próxima
        vacations.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
        
        vacations.forEach((event) => {
            const vacation = {
                ...event,
                start_date: formatDateToString(new Date(event.start_date), "DD/MM/YYYY"),
                end_date: formatDateToString(new Date(event.end_date), "DD/MM/YYYY"),
                date_asked: formatDateToString(new Date(event.date_asked), "DD/MM/YYYY hh:mm:ss"),
                status: status[event.status]
            };
            temporalVacations.push(vacation);
        });
    
        return temporalVacations;
    };

    const handleEditVacation = (item) => {
        console.log("se esta editando",item);
    };

    const handleDeleteVacation = async (item) => {
        
            console.log("se esta Eliminando",item);
            toggleShowModalDelete()
    };
    

    const handleSeeDetailsVacation = (item) => {
        console.log("se esta Viendo detalles",item);
        setShowModalSeeDetails(true)
    };

    const refresh = () => {
        fetchVacations();
      };


    const isDisabledCondition = (row,child) =>{
        return( row['area_manager_authorization'] == null && row["status"] == "aproved" )
    }

    return(
        <div className="div">

            <Modal show={showModalDelete} onHide={toggleShowModalDelete}>
                  <DeleteVacationBody
                    title="Eliminar Vacacion"
                    refresh={refresh}
                    toggle={toggleShowModalDelete}
                    item={selectItem}
                    itemView=""
                    delete={deleteVacation}
                  />
            </Modal>

            <CustomTable
            rows={formatVacationsToTable(fetchData).filter(v=>v)}
            fields={[
                ["start_date","Inicio"],
                ["end_date","Fin"],
                ["status","Estado"],
            ]}
            setSelectItem={setSelectItem}
            msgNotRows="No hay vacaciones pendientes"
            isDisabledCondition={isDisabledCondition}
         
            > 
            <button className="btn p-0 btn_table w-100" name='edit' onClick={()=>{setActionButton("edit")}}>Editar <i className="bi bi-pencil-square"></i></button>
            <button className="btn p-0 btn_table w-100" name='delete' onClick={()=>{setActionButton("delete")}}>Eliminar <i className="bi bi-calendar-x-fill"></i></button>
            <button className="btn p-0 btn_table w-100" name='seeDetails' onClick={()=>{setActionButton("seeDetails")}}>Ver Detalles <i className="bi bi-eye"></i></button>
            <button className="btn p-0 btn_table w-100" name='calendar' onClick={()=>{setActionButton("seeDetails")}}>Ver en Calendario<i className="bi bi-eye"></i></button>


            </CustomTable>
        </div>
        
        // <div className="administration_container">
        //     <div className="manager_container">

        //         <div className="select_container">
        //             <label htmlFor="filter">Filter</label><select name="" id="filter">
        //                 <option value="1">All</option>
        //                 <option value="2">Aprobed</option>
        //                 <option value="3">Rejected</option>
        //                 <option value="4">In Revision</option>
        //             </select>
        //         </div>
           
        //         <table className="table">
        //                 <thead className="thead">
                    
        //                 <tr>
        //                     <th>N°</th>
        //                     <th>Name</th>
        //                     <th>Start Date</th>
        //                     <th>Final Date</th>
        //                     <th>Actions</th>
        //                 </tr>
        //             </thead>
        //             {vacationsAsked.map((reserve, index)=>(
        //                 <TableRow key={index} index={index + 1} userName={reserve.name} startDate={reserve.startDate} endDate={reserve.endDate}/>
        //             ))}
        //             {/* <TableRow /> */}
        //         </table>
        //     </div>
        // </div>

    )
}