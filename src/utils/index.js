// функция получения текущей даты и времени
const currentDate = date => {
  
  const datenew = date ? new Date(date) : new Date();
  
  let days = datenew.getDate();
  let mounths = datenew.getMonth();
    
  let hours = datenew.getHours();
  let minuts = datenew.getMinutes();
  
  let month_name = [
    'января', 'февраля',
    'марта', 'апреля', 'мая',
    'июня', 'июля', 'августа',
    'сентября', 'октября',
    'ноября', 'декабря'
  ];
  
  let regDate = (' ' + days + ' ' + month_name[mounths] + ', ' 
    + hours + ':' + (minuts < 10 ? "0" : '') + minuts );
  
  return regDate;
}

  export default currentDate;