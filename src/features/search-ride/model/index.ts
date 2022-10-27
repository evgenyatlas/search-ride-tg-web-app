import { spread, some } from "patronum"
import { combine, createEffect, createEvent, createStore, Event, forward, guard, sample, Store } from "effector"
import { createValueStore } from "@/shared/lib/effector/createValueStore"
import { api } from "@/shared/api"
import { RideType, IRideFinded, IDestination } from "@/shared/api.types"
import { swap } from "@/shared/lib/effector/swap"
import { ridesModel } from "@/entities/ride"
import { createDestModel } from "./fabrica"
import { historyModel } from "./history"

/** the type of rider that we are looking for (for passengers or drivers) */
export const typeRideModel = createValueStore<RideType>("passenger")
export const numberPassengerModel = createValueStore(1)
//TODO: DEV
export const MIN_MAX_PASSENGERS: [number, number] = [1, 8]
/**Date and time of ride */
export const dateModel = createValueStore(Date.now())
/**Ride from */
export const fromDestModel = createDestModel('from')
/**Ride to */
export const toDestModel = createDestModel('to')
//** Event to swap data from "fromDest" to "toDest" */
export const swapFromToDest = swap(fromDestModel.$store, toDestModel.$store)
//To swap you need to choose a destination
export const $canSwaped = some({
    stores: [toDestModel.$store, fromDestModel.$store],
    predicate: ({ selected }) => !!selected
})

//Data store(form) for rides search form
export const $searchForm = combine({
    from: fromDestModel.$store.map(({ selected }) => selected),
    to: toDestModel.$store.map(({ selected }) => selected),
    passengers: numberPassengerModel.$store,
    date: dateModel.$store,
    rideType: typeRideModel.$store
})
/**If required fields are filled*/
export const $readySearchRide = $searchForm.map<boolean>(
    ({ from, to }) => !!from && !!to
)
/**client triggered event*/
export const submitSearchForm = createEvent()
/** effect for find rides */
export const findRides = createEffect(api.findRides)

sample({
    //When form is submited client
    clock: submitSearchForm,
    //the filter guarantees that the type will be as shown below
    filter: $readySearchRide,
    source: $searchForm as Store<IRideFinded>,
    target: [
        //send a request to find on the server
        findRides,
        //add request to history (so that the client can see it, etc.)
        historyModel.events.add
    ]
})
//When the effect receives data from the server, we add data to the model
forward({
    from: findRides.doneData,
    to: ridesModel.events.set
})