import { ChangeEventHandler } from "react"

interface TextAreaProps {
    onChangeHandler?: ChangeEventHandler<HTMLTextAreaElement>
    placeholder: string
    value: string
    className?: string
}

export default function TextArea({ placeholder, onChangeHandler, value, className }: TextAreaProps) {
    return (
        <textarea onChange={onChangeHandler} placeholder={placeholder} value={value} className={"p-2 bg-white placeholder:text-white/80 bg-opacity-30 backdrop-blur-2xl border border-white border-solid rounded focus-within:outline-primary text-white" + ' ' + className} />
    )
}