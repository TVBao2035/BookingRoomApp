export const timeAndDate = (timeString) => {
    const date = new Date(timeString);
    let hour = String(date.getUTCHours())
    let minute = String(date.getUTCMinutes())
    let second = String(date.getUTCSeconds())
    let day = String(date.getDate())
    let month = (String(date.getUTCMonth() + 1))
    let year = String(date.getFullYear())
    if (hour.length === 1) hour = "0" + hour;
    if(minute.length === 1) minute = '0'+ minute;
    if (second.length === 1) second = "0" + second;
    if (day.length === 1) day = '0' + day;
    if (month.length === 1) month = "0" + month;
    return `${hour}:${minute}:${second} - ${day}/${month}/${year}`
}

export const formatDate = (day, month, year) => {
    let sDay = String(day);
    let sMonth = String(month);
    let sYear = String(year);
    if (sDay.length === 1) sDay = '0' + sDay;
    if (sMonth.length === 1) sMonth = "0" + sMonth;
    return `${sYear}-${sMonth}-${sDay}`
}
export const calculatorDay = (timeString, numberOfDay) => {
    const date = new Date(timeString);
    let beforeDay = String(date.getDate());
    let beforMonth = (String(date.getUTCMonth() + 1));
    let beforYear = String(date.getFullYear());
    date.setDate(date.getDate() +numberOfDay)
    let afterDay = String(date.getDate());
    let afterMonth = (String(date.getUTCMonth() + 1));
    let afterYear = String(date.getFullYear());
    if (beforeDay.length === 1) beforeDay = '0' + beforeDay;
    if (beforMonth.length === 1) beforMonth = "0" + beforMonth;
    if (afterDay.length === 1) afterDay = '0' + afterDay;
    if (afterMonth.length === 1) afterMonth = "0" + afterMonth;

    return beforeDay+"/"+beforMonth+"/"+beforYear+" => " + afterDay + "/" + afterMonth +"/"+afterYear;

}