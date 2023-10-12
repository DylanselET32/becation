function formatDateToString(date, format = 'YYYY-MM-DD') {
  if(!date){return null}
    if(typeof date == 'string'){
      date = new Date(date)
    }
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
  
    const formattedDate = format
      .replace('YYYY', year)
      .replace('DD', day)
      .replace('MM', month);
  
    return formattedDate;
  }
  
  
  function getTime(date) {
    if(typeof date === 'string'){
      date = new Date(date)
    }
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
  
  function formatDateTime(date){
    return `${formatDateToString(date)}T${getTime(date)}`
  }
  function operateDate(date, days){
    return  new Date(date.setDate(date.getDate() + days));
  }
  function operateDateTime(date, minutes) {
    return new Date(date.getTime() + minutes * 60000); //en milisegundos lo transformamos a minutos multiplicando
  }


  const formatFullDateTime = (date)=>{
    return `${formatDateToString(date)}T${getTime(date)}`
  }


  function calculateDaysBetweenDates(startDate, endDate) {
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

  module.exports = {
    formatDateToString,
    formatDateTime,
    getTime,
    operateDate,
    operateDateTime,
    formatFullDateTime,
    calculateDaysBetweenDates
  };