export const formatTagCount = (count: number) => {
    if (count < 1000) {
        return count;
    } else if (count >= 1000 && count < 1000000) {
        return `${count / 1000}K`;
    } else if (count >= 1000000 && count < 1000000000) {
        return `${(count / 1000000).toFixed(2)}M`;
    }
}