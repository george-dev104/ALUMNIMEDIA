import Icon from "@/atoms/Icon"
import { formatDistance, subDays } from 'date-fns'
import Link from "next/link"


interface VideoProps {
    src: string
    title: string
    published_at: string
    id: number
}

export default function Video({ src, title, published_at, id }: VideoProps) {

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

    return (
        <Link href={`/videos/${id}`} className="group w-full flex flex-col gap-2">
            <img src={src} className="w-full h-full aspect-video rounded-xl" alt="" />
            <p className="text-left text-sm max-h-10 overflow-hidden text-ellipsis line-clamp-2 group-hover:underline hover:underline">{title}</p>
            <p className="text-left text-grey text-xs">Posted {formatDistance(subDays(new Date(), daysDiff), new Date(), { addSuffix: true })}</p>
        </Link>
    )
}