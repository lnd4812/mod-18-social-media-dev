const dateModifier = (date) => {
    let dateString = date.toString();

    const endNum = dateStr.charAt(dateString.length - 1);

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