const listMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getWeek = () => {
    const currentTime = new Date();
    const dayOfWeek = currentTime.getDay(); // 0 (Sun) to 6 (Sat)

    // Calculate start and end of the week
    const startOfWeek = new Date(currentTime);
    startOfWeek.setDate(currentTime.getDate() - dayOfWeek);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    // Format dates and handle cross-month cases
    const startMonth = listMonth[startOfWeek.getMonth()];
    const endMonth = listMonth[endOfWeek.getMonth()];

    return {
        startOfWeek: startOfWeek.getDate(),
        endOfWeek: endOfWeek.getDate(),
        startMonth: startMonth,
        endMonth: endMonth,
        str: `${startMonth} ${startOfWeek.getDate()} - ${endMonth} ${endOfWeek.getDate()}`,
    };
};

export default getWeek;
