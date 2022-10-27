import { delay } from "../../lib/async/delay"
import { random } from "../../lib/math/random"
import { IAPI, IDestination, IRide, IRideFinded } from "../../api.types"
import { getRandUser, LIST_DESTINATION } from "./data"

export class FakeAPI implements IAPI {
    async findDest(query: string): Promise<IDestination[]> {
        if (!query) return []
        const result = LIST_DESTINATION.filter(dist => dist.city.toLowerCase().indexOf(query.toLowerCase()) > -1)
        return result.slice(0, 6)
    }
    async findRides(rideFinded: IRideFinded): Promise<IRide[]> {
        await delay(400)
        const rides: Array<IRide> = []
        const countRides = random(7, 9)

        for (let i = 0; i < countRides; i++) {
            rides.push({
                from: rideFinded.from,
                to: rideFinded.to,
                date: Date.now() + (1000 * 60 * 60 * i),
                user: getRandUser(),
                rideType: rideFinded.rideType === 'driver' ? 'passenger' : 'driver',
                id: Math.random().toString(),
                passengers: random(1, 5),
                description: "dwdwd wkdwdkwd dkwdkwk"
            })
        }

        return rides
    }
    async findPopularDests(type: "from" | "to") {
        console.log(type === 'from' ? LIST_DESTINATION.slice(0, 7) : [...LIST_DESTINATION].reverse().slice(0, 7))
        return type === 'from' ? LIST_DESTINATION.slice(0, 7) : [...LIST_DESTINATION].reverse().slice(0, 7)
    }
}