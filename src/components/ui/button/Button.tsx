import React from 'react'

type ButtonVariant = 'primary' | 'submit' | 'danger' | 'header' | 'card'

type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
    type?: 'button' | 'submit'
    disabled?: boolean
    variant?: ButtonVariant
}

export function Button({
                                   children,
                                   onClick,
                                   type = 'button',
                                   disabled = false,
                                   variant = 'primary'
                               }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            data-variant={variant}
        >
            {children}
        </button>
    )
}
