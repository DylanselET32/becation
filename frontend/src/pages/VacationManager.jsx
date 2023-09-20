import {React} from "react";
import "../stylesheets/vacationAdministration.css"
import TableRow from "../components/TableRow";
import { useState, useEffect } from "react";
import { getAllVacations } from "../services/vacationService";
import { formatDateToString, operateDate } from "../helpers/misc/dateUtils";


export default function VacationManager(){

    // const vacations= [
    //     {
    //         name: "Dylan",
    //         startDate: "17-5-23",
    //         endDate: "19-5-23",
    // ]

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


    return(
        <div className="administration_container">
            <div className="manager_container">

                <div className="select_container">
                    <label htmlFor="filter">Filter</label><select name="" id="filter">
                        <option value="1">All</option>
                        <option value="2">Aprobed</option>
                        <option value="3">Rejected</option>
                        <option value="4">In Revision</option>
                    </select>
                </div>
           
                <table className="table">
                        <thead className="thead">
                    
                        <tr>
                            <th>N°</th>
                            <th>Name</th>
                            <th>Start Date</th>
                            <th>Final Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {vacationsAsked.map((reserve, index)=>(
                        <TableRow key={index} index={index + 1} userName={reserve.name} startDate={reserve.startDate} endDate={reserve.endDate}/>
                    ))}
                    {/* <TableRow /> */}
                </table>
            </div>
        </div>
    )
}