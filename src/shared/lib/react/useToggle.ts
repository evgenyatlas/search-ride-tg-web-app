import { useState } from "react";

export function useToggle(defaultValue: boolean = false): [boolean, () => void] {
    const [value, setValue] = useState(defaultValue)
    return [value, () => setValue(value => !value)]
}