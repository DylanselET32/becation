import {React} from "react";
import "../stylesheets/vacationAdministration.css"
import TableRow from "../components/TableRow";
import { useState, useEffect } from "react";
import { getAllVacations } from "../services/vacationService";
import { formatDateToString, operateDate } from "../helpers/misc/dateUtils";
import CustomTable from "../components/CustomTable";


export default function VacationManager(){


    const [vacationsAsked, setVacationsAsked] = useState([])
 
    useEffect(()=>{
        const callVacation = async ()=>{
            const request = await getAllVacations();
            const vacations = await request.data
            const status = await request

            console.log("USERS: ", status)
            const newVacations = []
            vacations.map(vacation =>{
                let newVacation = {
                    name: "Vacation Request",
                    startDate: vacation.start_date.substring(0, 10),
                    endDate: formatDateToString(operateDate(new Date(vacation.end_date), 1))
                }
                newVacations.push(newVacation)
            })

            setVacationsAsked(newVacations);
        }

        callVacation()
        console.log("NEW VACATIONS: ", vacationsAsked)
    }, [])


    const [selectItem, setSelectItem] = useState(null); // Estado que almacena el elemento seleccionado en la tabla

    const isDisabledCondition = (row,child) =>{
        console.log("AREA: ", row['area_manager_authorization'])
        // row es la fila a analisar y child es el boton de accion que estan abajo
        return( row['area_manager_authorization'] !== null && row["status"] !== "aproved" )
    }




    return(
        <CustomTable
            rows={vacationsAsked.filter(v=>v)}
            fields={[
                // ["date_asked","Solicitud"],
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