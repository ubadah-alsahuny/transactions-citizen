type Option = {
    label: string
    value: string
}

type SelectProps = {
    label?: string
    value: string
    options: Option[]
    onChange: (value: string) => void
}

export default function Select({
                                   label,
                                   value,
                                   options,
                                   onChange
                               }: SelectProps) {
    return (
        <div>
            {label && <label>{label}</label>}
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
