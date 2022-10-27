import React, { InputHTMLAttributes, ReactNode, useRef } from 'react'
import styles from './Input.module.css'

interface Input extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onSelect' | "value" | "selected" | "onChange"> {
    value?: string
    defaultValue?: string
    before?: ReactNode
    after?: ReactNode
    onChange?: (v: string) => void
}

//TODO:
//make a separate component
export function Input({ before, className, type, onClick, onChange, disabled, after, ...props }: Input) {

    return (
        <div
            className={`${styles.Input} ${className || ""} ${type ? styles[`Input_type_${type}`] : ''}`}
            //if there is a click on the selected element, it will be deleted
            onClick={onClick}
        >
            <div className={styles.Input__Before}>
                {before}
            </div>
            <input className={styles.Input__Input} onChange={e => onChange && onChange(e.target.value)} type={type} disabled={disabled} {...props} />
            {
                after
                &&
                <div className={styles.Input__After}>
                    {after}
                </div>
            }
        </div>
    )
}
