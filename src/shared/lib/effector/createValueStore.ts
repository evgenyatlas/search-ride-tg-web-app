import { createApi, createEvent, createStore, Event } from "effector"
import { createModel } from "./createModel"

//TODO: add a good description
/** Fabrica for  */
export function createValueStore<T>(value: T) {
    const $store = createStore<T>(value)
    const change = createEvent<T>()
    $store.on(change, (s, v) => v)

    return createModel($store, { change })
}