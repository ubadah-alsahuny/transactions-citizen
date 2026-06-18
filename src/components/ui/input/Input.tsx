import styles from '@/styles/ui/input/input.module.css';
import React from "react";

type InputProps = {
    label?: string
    icon?: React.ReactNode
    onChange: (value: any) => void
    type?: string
    value: string
    placeholder?: string
    required?: boolean
    error?: string
    id?: string
}

export default function Input({
                                  label,
                                  icon,
                                  onChange,
                                  type = 'text',
                                  value,
                                  required = false,
                                  error,
                                  id,
                              }: InputProps) {
    return (
        <div className={styles.input_wrapper}>
            {icon && <span className={styles.icon_settings}>{icon}</span>}
            <input
                id={id}
                type={type}
                placeholder={label}
                value={value}
                required={required}
                autoComplete='off'
                autoCapitalize='off'
                onChange={(e) => onChange(e.target.value)}
                className={`${styles.input_field_settings} ${error ? styles.input_error : ''}`}
            />
            {error && <p className={styles.error_text}>{error}</p>}
        </div>
    )
}