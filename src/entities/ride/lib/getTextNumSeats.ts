import { RideType } from "@/shared/api.types";
import { declOfNum } from "@/shared/lib/str/declOfNum";

export function getTextNumSeats(amount: number, rideType: RideType) {
    return `${amount} ${declOfNum(amount, rideType === 'driver' ? declForDriver : declForPassenger)}`
}

const declForDriver = ['место', 'места', 'мест']
const declForPassenger = ['пассажир', 'пассажира', 'пассажиров']