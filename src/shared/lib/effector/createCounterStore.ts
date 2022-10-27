import { createEvent, createStore } from "effector"
import { clamp } from "../math/clamp"

//TODO: rewrite to normal code
export function createCounterStore({ value = 0, minMax }: { value: number, minMax: [number, number] }) {
    const $counter = createStore(value)
    const incEv = createEvent<number>()

    $counter.on(incEv, (count, n) => clamp(count + n, minMax))

    return {
        $counter,
        incEv
    }
}