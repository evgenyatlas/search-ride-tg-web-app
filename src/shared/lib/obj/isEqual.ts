export function isEqual<T extends Object>(obj1: T, obj2: T, exclude?: Partial<Record<keyof T, true>>) {
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    if (keys1.length !== keys2.length) {
        return false
    }

    for (let key of keys1) {
        //if the key is specified in the exception, then we skip it
        if (exclude && exclude[key]) continue
        if (obj1[key] !== obj2[key]) {
            return false
        }
    }

    return true
}