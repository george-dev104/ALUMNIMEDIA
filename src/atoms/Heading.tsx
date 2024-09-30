import { Oswald } from "next/font/google"

const headingFont = Oswald({
    subsets: ['latin'],
    display: 'swap'
});

interface HeadingProps {
    className: string
    text: string
    h1?: boolean
}

export default function Heading({ className, text, h1 }: HeadingProps) {
    if (h1) return <h1 className={`${headingFont.className} leading-[45px] lg:leading-[55px] ${className}`}>{text}</h1>
    else return <h2 className={`${headingFont.className} leading-[45px] lg:leading-[55px] ${className}`}>{text}</h2>
}