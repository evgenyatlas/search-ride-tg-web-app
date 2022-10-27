import clsx from 'clsx'
import { useStore } from 'effector-react'
import { usePanel } from '@/shared/ui/StackPanel'
import { BackButton } from '@/shared/lib/tg-web-app'
import { ridesModel } from '@/entities/ride'
import { SearchValues } from '@/features/search-ride/ui/SearchValues'
import { RideCard } from '@/widgets/RideCard'
import styles from './FoundRidesPanel.module.css'

interface FoundRidesPanelProps {
    className?: string
}

export function FoundRidesPanel({ className }: FoundRidesPanelProps) {
    const rides = useStore(ridesModel.$store)
    const panel = usePanel()
    return (
        <div className={clsx(styles.FoundRidesPanel, className, 'container')}>
            <SearchValues onClick={panel.prev} />
            <div className={styles.FoundRidesPanel__List}>
                {
                    rides.map(ride => <RideCard key={ride.id} className={styles.FoundRidesPanel__Ride} {...ride} />)
                }
            </div>
            <BackButton onClick={panel.prev} />
        </div>
    )
}