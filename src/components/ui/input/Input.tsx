import styles from '@/styles/ui/input/input.module.css';
import React from "react";

type InputProps = {
    label?: string
    icon?: React.ReactNode
    onChange: (value: string) => void
    type?: string
    placeholder?: string
    required?: boolean
}

export default function Input({
                                  label,
                                  icon,
                                  onChange,
                                  type = 'text',
                                  required = false,
                              }: InputProps) {
    return (
        <div className={styles.input_container}>
            <div className={styles.input_icon_container}>
                {icon && <span className={styles.icon_settings}>{icon}</span>}
                <input
                    type={type}
                    placeholder=""
                    required={required}
                    autoComplete='off'
                    autoCapitalize='off'
                    onChange={(e) => onChange(e.target.value)}

                    className={styles.input_field_settings}
                />
                {label && <div className={styles.label_settings}>{label}</div>}
            </div>
        </div>
    )
}
