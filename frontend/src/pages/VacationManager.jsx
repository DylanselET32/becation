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
    //     },  {
    //         name: "Diego",
    //         startDate: "17-5-23",
    //         endDate: "19-5-23",
    //     },  {
    //         name: "Gonza",
    //         startDate: "23-5-23",
    //         endDate: "28-5-23",
    //     },  {
    //         name: "Dimitrije",
    //         startDate: "19-5-23",
    //         endDate: "28-5-23",
    //     },
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
                    title: "Vacation Request",
                    start: vacation.start_date.substring(0, 10),
                    end: formatDateToString(operateDate(new Date(vacation.end_date), 1))
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
                    <TableRow index={index + 1} userName={reserve.name} startDate={reserve.startDate} endDate={reserve.endDate}/>
                 ))}
                {/* <TableRow /> */}
            </table>
            
        </div>
    )
}