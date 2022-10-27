import { useStore } from 'effector-react'
import { PersonIcon } from '@/shared/ui/Icons/PersonIcon'
import { Select } from '@/shared/ui/Select'
import { NumberSeats } from '@/entities/ride'
import { MIN_MAX_PASSENGERS, numberPassengerModel, typeRideModel } from '../../model'
import styles from './NumberPassengers.module.css'


interface NumberPassengersProps {
    className?: string
}

export function NumberPassengers({ className }: NumberPassengersProps) {
    const amount = useStore(numberPassengerModel.$store)
    const rideType = useStore(typeRideModel.$store)
    return (
        <Select.Counter
            title="Количество Пассажиров"
            className={className}
            onChange={numberPassengerModel.events.change}
            before={
                <div className={styles.NumberPassengers__ItemSelected}>
                    <PersonIcon theme="--tg-theme-link-color" size='xs' /> <NumberSeats amount={amount} rideType={rideType} />
                </div>
            }
            minMax={MIN_MAX_PASSENGERS}
        />
    )
}