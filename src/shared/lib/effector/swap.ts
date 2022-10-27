import { createEvent, sample, Store } from "effector";
import { spread } from "patronum/spread";

export function swap<T>(a: Store<T>, b: Store<T>) {
    const swapEvent = createEvent()
    sample({
        source: { from: a, to: b },
        clock: swapEvent,
        target: spread({ targets: { from: b, to: a } }),
    })
    return swapEvent
}