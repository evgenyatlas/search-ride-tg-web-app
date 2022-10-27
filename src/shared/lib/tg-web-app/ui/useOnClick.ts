import { useEffect, useRef } from "react"

interface IParamsUseOnClick {
    onClick: Function | undefined
    componentTG: {
        onClick: Function
        offClick: Function
    }
}

/** onClick subscribe hook for native telegram components */
export function useOnClick({ onClick, componentTG }: IParamsUseOnClick) {
    //we store a callback to unsubscribe when we get a new one
    const { current: data } = useRef<{ prevOnClick: undefined | Function }>({
        prevOnClick: onClick
    })
    //logic for onClick
    useEffect(() => {
        if (onClick) {
            componentTG.onClick(onClick)
            //we save a callback to unsubscribe when we get a new one
            data.prevOnClick = onClick
        }
        return () => {
            if (!data.prevOnClick) return
            componentTG.offClick(data.prevOnClick)
            data.prevOnClick = undefined
        }
    }, [onClick])
}