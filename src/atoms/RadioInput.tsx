interface RadioInputProps {
    checked: boolean
}

export default function RadioInput({ checked }: RadioInputProps) {
    return (
        <input type="radio" checked={checked} className="shrink-0 mt-0.5 w-4 h-4 border-grey rounded-full text-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none" />
    )
}