// format date for timestamp - month, day, year, minute, and am/pm formatters

const dateModifier = (date) => {
    let dateString = date.toString();

    const endNum = dateString.charAt(dateString.length - 1);

    if (endNum === "1" && dateString !== '11') {
        dateString = `${dateString}st`;
    } else if (endNum === '2' && dateString !== '12') {
        dateString = `${dateString}nd`;
    } else if (endNum === '3' && dateString !== '13') {
        dateString = `${dateString}rd`;
    } else {
        dateString = `${dateString}th`;
    }

    return dateString;
};

module.exports = (
    timestamp,
    { monthLength = "short", dateSuffix = true } ={}
) => {
    const months = {
        0: monthLength === "short" ? "Jan" : "January",
        1: monthLength === "short" ? "Feb" : "February",
        2: monthLength === "short" ? "Mar" : "March",
        3: monthLength === "short" ? "Apr" : "April",
        4: monthLength === "short" ? "May" : "May",
        5: monthLength === "short" ? "Jun" : "June",
        6: monthLength === "short" ? "Jul" : "July",
        7: monthLength === "short" ? "Aug" : "August",
        8: monthLength === "short" ? "Sep" : "September",
        9: monthLength === "short" ? "Oct" : "October", 
        10: monthLength === "short" ? "Nov" : "November",
        11: monthLength === "short" ? "Dec" : "December",
    };

    const dateObj = new Date(timestamp);
    const month = months[dateObj.getMonth()];

    const day = dateSuffix
    ? dateModifier(dateObj.getDate())
    : dateObj.getDate(); 

    const year = dateObj.getFullYear();
    let hour = 
        dateObj.getHours() > 12
        ? Math.floor(dateObj.getHours() - 12)
        : dateObj.getHours();
        
    if (hour === 0) {
        hour = 12;
    }    

    const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();

    const amOrPm = dateObj.getHours() >= 12 ? 'pm' : 'am';

    // put it all together:
    const formattedTimeStamp = `${month} ${day}, ${year} at ${hour}:${minutes} ${amOrPm}`;

    return formattedTimeStamp;
};