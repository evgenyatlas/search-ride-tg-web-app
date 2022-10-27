import clsx from 'clsx'
import React from 'react'
import styles from './Separator.module.css'

interface SeparatorProps {
    className?: string
}

export function Separator({ className }: SeparatorProps) {
    return (
        <div className={clsx(styles.Separator, className)} />
    )
}

