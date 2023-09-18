import React from "react";
import "../stylesheets/vacationAdministration.css"
import TableRow from "../components/TableRow";


export default function VacationAdministration(){

    const vacations= [
        {
            name: "Dylan",
            startDate: "17-5-23",
            endDate: "19-5-23",
        },  {
            name: "Diego",
            startDate: "17-5-23",
            endDate: "19-5-23",
        },  {
            name: "Gonza",
            startDate: "23-5-23",
            endDate: "28-5-23",
        },  {
            name: "Dimitrije",
            startDate: "19-5-23",
            endDate: "28-5-23",
        },
    ]

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
                 {vacations.map((reserve, index)=>(
                    <TableRow index={index + 1} userName={reserve.name} startDate={reserve.startDate} endDate={reserve.endDate}/>
                 ))}
                {/* <TableRow /> */}
            </table>
            
        </div>
    )
}