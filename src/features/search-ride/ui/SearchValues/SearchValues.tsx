import { DOMAttributes } from 'react'
import { useStore } from 'effector-react'
import { datetime } from '@/shared/lib/datetime'
import { ArrowIcon } from '@/shared/ui/Icons/ArrowIcon'
import { TextDestination } from '@/entities/ride'
import { NumberSeats } from '@/entities/ride'
import { $searchForm } from '../../model'
import styles from './SearchValues.module.css'
import { TextRouteRide } from '@/entities/ride/ui/TextRouteRide'
import clsx from 'clsx'


interface SearchValuesProps {
    className?: string
    onClick?: DOMAttributes<HTMLDivElement>['onClick']
}

export function SearchValues({ className, onClick }: SearchValuesProps) {
    const rideFinded = useStore($searchForm)

    if (!rideFinded.from || !rideFinded.to)
        return null

    return (
        <div className={clsx(styles.SearchValues, className)} onClick={onClick}>
            <ArrowIcon className={styles.SearchValues__BackIcon} location='left' />
            <div className={styles.SearchValues__Content}>
                <TextRouteRide from={rideFinded.from} to={rideFinded.to} />
                <div className={styles.SearchValues__DatePassengers}>
                    {datetime.formatDate(new Date(rideFinded.date))}
                    , <NumberSeats amount={rideFinded.passengers} rideType={rideFinded.rideType} />
                </div>
            </div>
        </div>
    )
}

