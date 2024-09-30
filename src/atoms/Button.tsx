import Link from "next/link"
import { MouseEventHandler } from "react"

interface ButtonProps {
    label: string
    href?: string
    onClickHandler?: MouseEventHandler
    theme?: 'outline'
    className?: string
}

export default function Button({ label, href, onClickHandler, theme, className }: ButtonProps) {

    let _className = 'bg-white px-6 py-2 rounded border border-solid border-white text-black hover:opacity-80 w-fit';

    switch (theme) {
        case 'outline':
            _className = 'px-6 py-2 rounded border border-solid border-white text-white hover:opacity-80 w-fit bg-white/20 backdrop-blur';
            break;
    }

    _className += ' ' + className;

    if (href) return <Link className={`block ${_className}`} href={href}>{label}</Link>
    else return <button className={_className} onClick={onClickHandler}>{label}</button>

}