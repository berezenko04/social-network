export const getDays = () => {
    const days: string[] = [];

    for (let i = 1; i < 31; i++) {
        days.push(i.toString());
    }

    return days;
}