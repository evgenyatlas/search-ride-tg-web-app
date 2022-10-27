import { RideType } from '@/shared/api.types'
import { getTextNumSeats } from '../../lib/getTextNumSeats'

interface NumberSeatsProps {
    amount: number
    rideType: RideType
}

/** 
 * Component for displaying text with the number of seats (for a passenger or driver) in the following format:
 * 1 пассажир, 5 пассажиров, 2 места
 */
export function NumberSeats({ amount, rideType }: NumberSeatsProps) {
    return (
        <span>{getTextNumSeats(amount, rideType)}</span>
    )
}

