import { useEffect, useRef } from "react"

export default function useClickOut<T = HTMLElement>(handler: () => void) {
    const ref = useRef<T>(null)
    const handleClickOutside = (event) => {
        //@ts-ignore
        if (ref.current && !ref.current.contains(event.target))
            handler()
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () =>
            document.removeEventListener('click', handleClickOutside, true)
    }, [])

    return ref
}