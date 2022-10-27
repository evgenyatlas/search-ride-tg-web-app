import clsx from 'clsx'
import { useStore } from 'effector-react'
import { IRide, IRideFinded } from '@/shared/api.types'
import { ArrowIcon } from '@/shared/ui/Icons/ArrowIcon'
import { HistoryIcon } from '@/shared/ui/Icons/HistoryIcon'
import { TextRouteRide } from '@/entities/ride/ui/TextRouteRide'
import { historyModel } from '../../model/history'
import styles from './HistorySearch.module.css'
import { fromDestModel, toDestModel } from '../../model'

interface HistorySearchProps {
    className?: string
}

export function HistorySearch({ className }: HistorySearchProps) {
    const rideHistory = useStore(historyModel.$store)
    return (
        <div className={clsx(styles.HistorySearch, className)}>
            {
                rideHistory.map((ride, i) => <ItemHistory key={i} {...ride} />)
            }
        </div>
    )
}

export function ItemHistory(ride: IRideFinded) {
    return (
        <div className={styles.ItemHistory} onClick={() => {
            fromDestModel.events.changeSelected(ride.from)
            toDestModel.events.changeSelected(ride.to)
        }}>
            <HistoryIcon className={styles.ItemHistory__Icon} size="xs" theme="--tg-theme-text-color" opacity={0.8} />
            <TextRouteRide className={styles.ItemHistory__Route} {...ride} />
            <ArrowIcon size={12} className={styles.ItemHistory__Enter} theme="--tg-theme-text-color" location='right' />
        </div>
    )
}