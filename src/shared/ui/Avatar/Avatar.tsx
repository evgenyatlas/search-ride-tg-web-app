import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './Avatar.module.css'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
    name: string
    photo?: string
    color?: "blue" | "green" | "red" | "orange"
    size?: 's' | 'm'
}

/** Component for displaying an avatar from the first two letters or photo */
export function Avatar({ className, name, color, photo, size = 's', ...props }: AvatarProps) {
    return (
        <div
            className={clsx(styles.Avatar, className, styles[`Avatar_color_${color}`], styles[`Avatar_size_${size}`])}
            style={{
                backgroundImage: `url(${photo})`
            }}
            {...props}
        >
            {!photo ? name.slice(0, 2) : null}
        </div>
    )
}