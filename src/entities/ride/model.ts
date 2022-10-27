import { createApi, createStore } from "effector"
import { createModel } from "@/shared/lib/effector/createModel";
import { IRide } from "@/shared/api.types"

const $rides = createStore<Array<IRide>>([])
const eventsRides = createApi($rides, {
    set(store, payload: Array<IRide>) {
        return payload
    },
    add(store, payload: Array<IRide>) {
        return [...store, ...payload]
    }
})
export const ridesModel = createModel($rides, eventsRides)