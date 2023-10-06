export function formatDateToString(date, format = 'YYYY-MM-DD') {
    if(typeof date === 'string'){
      date = new Date(date)
    }
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const formattedDate = format
      .replace('YYYY', year)
      .replace('DD', day)
      .replace('MM', month)
      .replace('hh', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  
    return formattedDate;
  }
  

export function formatDate(date){
    return `${formatDateToString(date)}`
  }
  export function operateDate(date, days){
    return  new Date(date.setDate(date.getDate() + days));
  }
  export  function operateDateTime(date, minutes) {
    return new Date(date.getTime() + minutes * 60000); //en milisegundos lo transformamos a minutos multiplicando
  }
  
  export function calculateDaysBetweenDates(startDate, endDate) {
    // Convert the dates to Date objects
    if(typeof startDate === 'string'){
      startDate = new Date(startDate)
    }
    if(typeof endDate === 'string'){
      endDate = new Date(endDate)
    }

    // Calculate the time difference in milliseconds
    const difference = Math.abs(endDate - startDate);
  
    // Convert the difference to days
    const daysDifference = Math.ceil(difference / (1000 * 60 * 60 * 24))+1; //le sumo uno para que tenga en cuenta el dia que esta solicitando 
  
    return daysDifference;
  }
  