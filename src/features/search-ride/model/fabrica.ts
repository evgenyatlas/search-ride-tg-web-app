import { createApi, createEffect, createEvent, createStore, forward, sample, Store } from "effector"
import { debounce } from "patronum"
import { api } from "../../../shared/api"
import { createModel } from "../../../shared/lib/effector/createModel"
import { createValueStore } from "../../../shared/lib/effector/createValueStore"
import { IDestination, IRide } from '../../../shared/api.types'

export interface DestionationModel {
    selected: IDestination | null
    /**Offered directions based on the reqValue*/
    offers: Array<IDestination>
    reqValue: string
    /**Destination type - from or to*/
    type: "from" | "to"
}

export function createDestModel(type: "from" | "to") {

    const $store = createStore<DestionationModel>({
        selected: null,
        offers: [],
        reqValue: '',
        type,
    })

    const events = createApi($store, {
        changeSelected: (state, selected: DestionationModel['selected']) => ({
            ...state,
            selected
        }),
        changeOffers: (state, offers: DestionationModel['offers']) => ({
            ...state,
            offers
        }),
        changeReqValue: (state, reqValue: DestionationModel['reqValue']) => ({
            ...state,
            reqValue
        })
    })

    const effects = {
        findDests: createEffect(api.findDest),
        findPopularDests: createEffect(() => api.findPopularDests(type))
    }

    //change offers 
    forward({
        //when
        from: [
            //search for destinations by user input
            debounce({
                source: events.changeReqValue,
                timeout: 350,
                target: effects.findDests
            }).doneData,
            //search for popular destinations
            effects.findPopularDests.doneData
        ],
        to: events.changeOffers
    })

    //if offers of destinations are empty then we find popular
    sample({
        clock: $store.map(({ offers }) => offers),
        filter: (offer) => !offer.length,
        target: effects.findPopularDests
    })

    //called at the beginning so that the choice of destinations (Select Component) is not empty
    effects.findPopularDests()

    return createModel($store, events)
}