import React from 'react'

type ButtonVariant = 'primary' | 'submit' | 'danger' | 'header' | 'card'

type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
    type?: 'button' | 'submit'
    disabled?: boolean
    variant?: ButtonVariant
    className?: string
}

export function Button({
                           children,
                           onClick,
                           type = 'button',
                           disabled = false,
                           variant = 'primary',
                           className = ''
                       }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            data-variant={variant}
            className={className}
        >
            {children}
        </button>
    )
}