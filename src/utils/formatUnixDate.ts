export const formatUnixDate = (unixDate: number) => {
    const date = new Date(new Date(unixDate * 1000));
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
    }).format(date);
    return formattedDate.replace(",", "")
};