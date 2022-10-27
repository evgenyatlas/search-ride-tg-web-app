import clsx from 'clsx'
import { IDestination } from '@/shared/api.types'
import { Destination, DestinationProps } from '../Destination'
import styles from './RouteRide.module.css'

interface RouteRideProps {
    className?: string
    from: IDestination
    to: IDestination
    size?: DestinationProps['size']
}

export function RouteRide({ className, from, to, size = 'm' }: RouteRideProps) {
    return (
        <div className={clsx(styles.RouteRide, className)}>
            <Destination size={size} border={false} {...from} />
            <Destination className={styles.RouteRide__DestTo} size={size} border={false} {...to} />
            <div className={styles.RouteLine}>
                <div className={styles.RouterLine__Line} />
            </div>
        </div>
    )
}