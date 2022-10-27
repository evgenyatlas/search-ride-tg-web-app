import { Store, Event } from "effector"

//TODO: make normal type
export interface IModel<T, E extends unknown, FX extends unknown = undefined> {
    $store: Store<T>
    events: E
    effects?: FX
}