import React, { InputHTMLAttributes, ReactNode, useEffect, useRef } from 'react'
import clsx from 'clsx'
import styles from './Input.module.css'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    className?: string
    stretched?: boolean
    appearance?: 'transparent'
    size?: 's' | 'm'
    after?: ReactNode
    before?: ReactNode
    value?: string
}

export function Input({ className, stretched, onFocus, appearance, size, after, before, ...props }: InputProps) {
    const ref = useRef<HTMLInputElement>(null)
    return (
        <div
            className={clsx(
                styles.Input,
                {
                    [styles[`Input_stretched`]]: stretched,
                    [styles[`Input_appearance_${appearance}`]]: appearance,
                    [styles[`Input_size_${size}`]]: size
                },
                className
            )
            }
        >
            {before}
            <input ref={ref}
                className={styles.Input__Input}  {...props} />
            {after}
        </div>
    )
}