export const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const now = new Date();

    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds}s`;
    } else if (diffInSeconds < 3600) {
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        return `${diffInMinutes}m`;
    } else if (date.getFullYear() === now.getFullYear()) {
        const options: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric'
        };
        return date.toLocaleDateString('en-US', options);
    } else if (date.getFullYear() === now.getFullYear() - 1) {
        const options: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        };
        return date.toLocaleDateString('en-US', options);
    } else {
        const options: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        };
        return date.toLocaleDateString('en-US', options);
    }
};
