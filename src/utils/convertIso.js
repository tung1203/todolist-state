//2020-08-14T11:19
const convertIso = (date) => {
  var newDate = new Date(date);

  let day = newDate.getDate(),
    month = newDate.getMonth() + 1,
    year = newDate.getFullYear(),
    hour = newDate.getHours(),
    minute = newDate.getMinutes();
  hour = hour < 10 ? "0" + newDate.getHours() : newDate.getHours();
  month = month < 10 ? "0" + newDate.getMonth() : newDate.getMonth();
  minute = minute < 10 ? "0" + newDate.getMinutes() : newDate.getMinutes();

  return `${year}-${month}-${day}T${hour}:${minute}`;
};
export default convertIso;
