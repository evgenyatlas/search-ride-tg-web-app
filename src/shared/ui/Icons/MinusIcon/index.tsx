import React from 'react'
import { Icon, IconProps, IconTemplateProps } from '../Icon/Icon'

export function MinusIcon({ className, ...props }: IconTemplateProps) {
    return (
        <Icon
            className={className}
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="6" viewBox="0 0 32 6">
                    <path d="M29.6729 0.727272H2.39387C1.13842 0.727272 0.120605 1.74485 0.120605 3C0.120605 4.25515 1.13842 5.27273 2.39387 5.27273H29.6729C30.9284 5.27273 31.9462 4.25515 31.9462 3C31.9462 1.74485 30.9284 0.727272 29.6729 0.727272Z" />
                </svg>
            }
            {...props}
        />
    )
}