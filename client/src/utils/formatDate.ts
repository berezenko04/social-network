export const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
}