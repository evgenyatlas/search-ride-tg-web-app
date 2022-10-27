import { Event } from 'effector'
import { useEffect } from 'react'

export function useEvent<T>(event: Event<T>, cb: (value: T) => void) {
    useEffect(() => {
        const unsub = event.watch(cb)
        return () => {
            unsub.unsubscribe()
        }
    }, [])
}