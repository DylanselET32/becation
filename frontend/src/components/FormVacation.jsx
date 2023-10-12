import { useEffect, useState } from "react"
import "../stylesheets/formVacation.css"
import { formatDateToString } from "../helpers/misc/dateUtils"

const  initialForm = {
    initialDate:"",
    finalDate:""
}

export default function FormVacation({isCalled, formFather, handleSubmit}){

    const [form, setForm] = useState(initialForm)

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })

        formFather({
            ...form,
            [e.target.name] : e.target.value
        })

        console.log(typeof form.finalDate)
    }
    useEffect(()=>{
        setForm(initialForm)
    },[isCalled])

    return(
        <form action="" className={isCalled ? "formVacation" : "hiddenForm"} onSubmit={handleSubmit} >
            <div>
                <div className="d-flex">
                    <div className="input_container">
                        <label htmlFor="start_date">Fecha de Inicio</label>
                        <input min={ formatDateToString(new Date()) } type="date" id="start_date" name="initialDate" value={form.initialDate} onChange={handleChange} className="date_input" />
                    </div>
                    <div className="input_container">
                        <label htmlFor="start_date">Fecha de Fin</label>
                        <input min={ form.initialDate  || formatDateToString(new Date())  } type="date" id="final_date" name="finalDate" value={form.finalDate} onChange={handleChange} className="date_input" />
                    </div>
                </div>
                <div className= "input_container button_container">
                    <input type="submit"  disabled={form.initialDate.length < 1 && form.finalDate.length < 1} className={form.initialDate.length > 1 && form.finalDate.length > 1 ? "button_form_available" : "button_form "} />
                </div>
            </div>

        </form>
    )
}