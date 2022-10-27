import clsx from 'clsx'
import { IDestination } from '@/shared/api.types'
import styles from './TextDestination.module.css'

interface TextDestinationProps extends IDestination {
    className?: string
}

export function TextDestination({ className, city, country }: TextDestinationProps) {
    return (
        <span className={clsx(styles.TextDestination, className)}>
            {city ? `${city}, ` : ''}{country}
        </span>
    )
}