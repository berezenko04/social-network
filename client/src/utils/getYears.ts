export const getYears = () => {
    const years: string[] = [];
    const dateNow: Date = new Date();
    const currentYear: number = dateNow.getFullYear();

    for (let i = currentYear - 100; i <= currentYear; i++) {
        years.push(i.toString());
    }

    return years;
}