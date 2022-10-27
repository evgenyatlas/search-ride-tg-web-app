import { Location } from '@/shared/system.types'
import React, { memo } from 'react'
import { Icon, IconTemplateProps } from '../Icon/Icon'

interface ArrowIconProps extends IconTemplateProps {
    location?: Location
    type?: 'default' | 'long'
}

export const ArrowIcon = memo(function ArrowIcon({ className, type = 'default', size = 14, location = 'bottom', style, theme = '--tg-theme-hint-color', ...props }: ArrowIconProps) {
    return (
        <Icon
            className={className}
            theme={theme}
            size={size}
            icon={iconTypeMap[type]}
            style={{
                ...style,
                transform: `rotateZ(${getDegLocation(location)})`
            }}
            {...props}
        />
    )
})

//Dictionary for storing different icons (svg)
const iconTypeMap = {
    default: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 9">
            <path d="M13.7166 1.75179L7.73043 8.20895C7.33471 8.63581 6.65946 8.63581 6.26374 8.20895L0.277582 1.75179C0.0950379 1.55423 -0.00474862 1.28917 0.000173843 1.01491C0.00509631 0.740659 0.114325 0.479674 0.30383 0.289375C0.493335 0.0990763 0.747594 -0.00494957 1.01067 0.000182152C1.27375 0.00531387 1.5241 0.119183 1.70664 0.316739L6.99708 6.02653L12.2934 0.316739C12.4759 0.119183 12.7262 0.00531387 12.9893 0.000182152C13.2524 -0.00494957 13.5067 0.0990763 13.6962 0.289375C13.8857 0.479674 13.9949 0.740659 13.9998 1.01491C14.0047 1.28917 13.905 1.55423 13.7224 1.75179H13.7166Z" />
        </svg>
    ),
    long: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 14" >
            <path d="M4.14645 13.8536C4.34171 14.0488 4.65829 14.0488 4.85355 13.8536L8.03553 10.6716C8.2308 10.4763 8.2308 10.1597 8.03553 9.96447C7.84027 9.7692 7.52369 9.7692 7.32843 9.96447L4.5 12.7929L1.67157 9.96447C1.47631 9.7692 1.15973 9.7692 0.964466 9.96447C0.769204 10.1597 0.769204 10.4763 0.964466 10.6716L4.14645 13.8536ZM4 0.5L4 13.5H5L5 0.5L4 0.5Z" />
        </svg>
    )
}

function getDegLocation(location?: Location): string {
    switch (location) {
        case 'left':
            return '90deg'
        case 'top':
            return '180deg'
        case 'right':
            return '270deg'
        default:
            return '0deg'
    }
}