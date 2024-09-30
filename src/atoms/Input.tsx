import { ChangeEventHandler } from "react"

interface InputProps {
    onChangeHandler?: ChangeEventHandler<HTMLInputElement>
    placeholder: string
    value: string
    className?: string
}

export default function Input({ placeholder, onChangeHandler, value, className }: InputProps) {
    return (
        <input onChange={onChangeHandler} type="text" placeholder={placeholder} value={value} className={"p-2 bg-white placeholder:text-white/80 bg-opacity-30 backdrop-blur-2xl border border-white border-solid rounded focus-within:outline-primary text-white" + ' ' + className} />
    )
}