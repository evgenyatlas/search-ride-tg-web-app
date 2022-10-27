import React, { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    size?: "s" | "m" | "l" | "xl"
    /** Disable border radius with selected side */
    disabledBR?: "top" | "bottom"
    appearance?: "positive" | "transparent"
    stretched?: boolean
}


export function Button({ className, children, size, appearance, stretched, disabledBR, ...props }: ButtonProps) {
    return (
        <button className={clsx(styles.Button, className, {
            [styles[`Button_size_${size}`]]: size,
            [styles[`Button_appearance_${appearance}`]]: appearance,
            [styles[`Button_stretched`]]: stretched,
            [styles[`Button_disabledBR_${disabledBR}`]]: disabledBR
        })} {...props}>
            {children}
        </button>
    )
}