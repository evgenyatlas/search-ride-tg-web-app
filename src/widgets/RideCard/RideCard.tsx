import clsx from 'clsx'
import { Card } from '@/shared/ui/Card'
import { IRide } from '@/shared/api.types'
import { datetime } from '@/shared/lib/datetime'
import { usePanel } from '@/shared/ui/StackPanel'
import { UserCell } from '@/entities/user'
import { NumberSeats } from '@/entities/ride'
import { RouteRide } from '@/entities/ride'
import styles from './RideCard.module.css'

interface RideCardProps extends IRide {
    className?: string
}

export function RideCard({ className, from, to, user, date, passengers, rideType }: RideCardProps) {
    //TODO: DEV
    const panel = usePanel()
    return (
        <Card className={clsx(styles.RideCard, className)} onClick={() => panel.add('ride')}>
            <div className={styles.RideCard__Head}>
                <span>{datetime.formatDate(new Date(date))}</span>
                <span><NumberSeats amount={passengers} rideType={rideType} /></span>
            </div>
            <RouteRide className={styles.RideCard__Route} from={from} to={to} />
            <UserCell {...user} />
        </Card>
    )
}

