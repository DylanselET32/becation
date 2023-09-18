import React from "react";
import "../stylesheets/tableRow.css"
import CheckIcon from "../imgs/check.svg"
import CrossIcon from "../imgs/cross.svg"
import QuestionIcon from "../imgs/question-square.svg"
import ViewEye from "../imgs/eye.svg"

export default function TableRow({index, userName, startDate, endDate}){
 
    return(
        <>
        <tr className="rowTable">
            <th>{index}</th>
            <th>{userName}</th>
            <th>{startDate}</th>
            <th>{endDate}</th>
            <th className="action-field">
                <button className="button_table"><img src={CheckIcon} alt="" /></button>
                <button className="button_table"><img src={CrossIcon} alt="" /></button>
                <button className="button_table"><img src={QuestionIcon} alt="" /></button>
                <button className="button_table"><img src={ViewEye} alt="" /></button>
            </th>
        </tr>
        
        </>
    

    )
}