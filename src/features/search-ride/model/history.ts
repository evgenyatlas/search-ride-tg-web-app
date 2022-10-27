import { createModel } from "@/shared/lib/effector/createModel";
import { IRideFinded } from "@/shared/api.types";
import { createEvent, createStore } from "effector";
import { persist } from "effector-storage/local";
import { uid } from "@/shared/lib/str/uid";
import { isEqual } from "@/shared/lib/obj/isEqual";

interface IHistoryRide extends IRideFinded {
    id: string
}

const limit = 5
const $history = createStore<Array<IHistoryRide>>([])
//storage store in localstorage
persist({
    store: $history,
    key: 'history-search'
})
const add = createEvent<IRideFinded>()
$history.on(add, (state, ride) => {

    const historyRide: IHistoryRide = {
        ...ride,
        id: uid()
    }

    //remove duplicate rides 
    const rides = state.filter(ride => !isEqual(historyRide, ride, { id: true }))

    //limit the number of saved ride
    return [historyRide, ...rides].slice(0, limit)
})

/**Model for storing ride search history**/
export const historyModel = createModel($history, {
    add
})