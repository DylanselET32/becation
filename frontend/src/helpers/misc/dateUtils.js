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
  