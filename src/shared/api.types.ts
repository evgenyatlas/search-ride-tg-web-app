export interface IUser {
    name: string
    avatar?: string
    tgNick: string
    phone: string
}

/**
 * IDestination is interface for describing a point(country, city) on the map (ride from and to)
 */
export interface IDestination {
    city: string
    country: string
    flag: string
}

/** Ride type i.e. published by passenger or driver */
export type RideType = 'passenger' | 'driver'
/**
 * Ride from Destination to Destination
 */
export interface IRide {
    id: string
    rideType: RideType
    from: IDestination
    to: IDestination
    date: number
    user: IUser
    passengers: number
    description: string
}

/**
 * Interface to find for a ride on the server
 */
export interface IRideFinded extends Omit<IRide, 'user' | 'description' | 'id'> {

}

/**
 * API for communication with the server
 */
export interface IAPI {
    auth?(userData: any): Promise<IUser>
    /**
     * Find popular destinations
     * @param type - type of recommended destinations (from or to)
     * @returns a list of recommended destinations 
    */
    //usually called at the beginning so that the choice of destinations (SelectComponent) is not empty
    findPopularDests(type: "from" | "to"): Promise<Array<IDestination>>
    /**
     * Find a destination by query(keyword)
     * @param queryString - keyword
     * @param extra - Extra search options (for example, we can specify that the destination from us is known and we want to find destination to)
    */
    findDest(queryString: string, extra?: { ride: Partial<IRide> }): Promise<Array<IDestination>>
    /**Find a list of rides */
    findRides(rideFinded: IRideFinded): Promise<Array<IRide>>
    addRide?(ride: IRide): Promise<IRide>
}