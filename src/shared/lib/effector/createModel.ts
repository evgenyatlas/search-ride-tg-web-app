import { Store, Event } from "effector"
import { IModel } from "./types"

export function createModel<S, E = Record<string, unknown>, FX = Record<string, unknown>>($store: Store<S>, events: E, effects?: FX): IModel<S, E, FX> {
    return {
        $store,
        events,
        effects
    }
}