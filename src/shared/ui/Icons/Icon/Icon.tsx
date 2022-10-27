import React, { ButtonHTMLAttributes, ReactElement, HTMLAttributes } from 'react'
import { TgColorsTheme } from '@/shared/lib/tg-web-app'
import styles from './Icon.module.css'

type Size = 'xs' | 's' | 'm' | 'l' | number
export interface IconProps extends HTMLAttributes<HTMLOrSVGElement> {
    className?: string
    opacity?: number
    size?: Size | number
    icon: ReactElement
    /** Icon color (set of colors from telegram color themes) */
    theme?: TgColorsTheme | null
}

export interface IconTemplateProps extends Omit<IconProps, 'icon'> {

}

const sizes: {
    [key in Size]: number
} = {
    "xs": 16,
    "s": 19,
    "m": 38,
    "l": 76
}

function getSize(size: Size) {
    return sizes[size] || size
}

export function Icon({ className, size = 's', icon, theme = '--tg-theme-text-color', opacity, ...props }: IconProps) {
    size = getSize(size)

    return (
        React.cloneElement(icon, {
            className,
            width: size,
            style: {
                fill: theme ? `var(${theme})` : '',
                opacity,
                //it can be bad for performance
                ...props.style
            }
        })
    )
}