import { formatDistance, subDays } from "date-fns";

export function getTime(published_at: string) {
    let date1 = new Date(published_at);
    let date2 = new Date();

    // Calculating the time difference
    // of two dates
    let timeDiff =
        date2.getTime() - date1.getTime();

    // Calculating the no. of days between
    // two dates
    let daysDiff =
        Math.round
            (timeDiff / (1000 * 3600 * 24));

    return formatDistance(subDays(new Date(), daysDiff), new Date(), { addSuffix: true })
}