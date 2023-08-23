import "../stylesheets/formVacation.css"

export default function FormVacation(){

    return(
        <form action="" className="form">
            <div className="input_container">
                <label htmlFor="start_date">Fecha de Inicio: </label>
                <input type="date" id="start_date"/>
            </div>
            <div className="input_container">
                <label htmlFor="start_date">Fecha de Fin: </label>
                <input type="date" id="start_date"/>
            </div>
            <div className="input_container button_container">
                <input type="submit"  />
            </div>
            
        </form>
    )

}