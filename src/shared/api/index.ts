import { IAPI, IDestination, IRide, IRideFinded } from "../api.types"
import { FakeAPI } from "./fakeAPI"

export class API implements IAPI {
    constructor(private api: IAPI) { }
    //i use arrow fn to bind the context
    findDest = async (query: string) => {
        return this.api.findDest(query)
    }
    findRides = async (rideFinded: IRideFinded) => {
        return this.api.findRides(rideFinded)
    }
    findPopularDests = (type: "from" | "to") => {
        return this.api.findPopularDests(type)
    }
}

export const api = new API(new FakeAPI())