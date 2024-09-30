import { ChangeEventHandler, Ref } from "react"

interface UploadProps {
    id: string
    children: React.ReactNode
    inputRef: Ref<HTMLInputElement>
    onChangeHandler?: ChangeEventHandler<HTMLInputElement>
}

export default function Upload({ id, children, inputRef, onChangeHandler }: UploadProps) {
    return (
        <form>
            <input onChange={onChangeHandler} ref={inputRef || undefined} className="hidden" type="file" id={id} name={id}></input>
            <label htmlFor={id}>{children}</label>
        </form>
    )
}