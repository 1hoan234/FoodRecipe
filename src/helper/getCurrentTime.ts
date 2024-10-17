const listMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const litDayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getTime = (str: string) => {
    const currentTime = new Date(str);

    const date = currentTime.getDate();
    const month = listMonth[currentTime.getMonth()];
    const day = litDayOfWeek[currentTime.getDay()];
    
    return {
        str: `${day}, ${month} ${date}`,
        date: date,
    };
};

export default getTime;