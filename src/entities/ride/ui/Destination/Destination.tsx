import { IDestination } from '@/shared/api.types'
import clsx from 'clsx'
import styles from './Destination.module.css'

type Size = 's' | 'm' | 'l'

export interface DestinationProps extends IDestination {
    className?: string
    size?: Size
    border?: boolean
}

export function Destination({ className, size, city, country, flag, border = true }: DestinationProps) {
    return (
        <div className={clsx(
            styles.Destination,
            className,
            {
                [styles[`Destination_size_${size}`]]: size,
                [styles.Destination__border_disable]: !border
            }
        )}>
            <div className={styles.Destination__Flag}>{flag}</div>
            <div className={styles.Destination__Info}>
                <div className={styles.Destination__City}>{city}</div>
                <div className={styles.Destination__Country}>{country}</div>
            </div>
        </div>
    )
}