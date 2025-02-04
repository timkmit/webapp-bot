import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler: ReturnType<typeof setTimeout> = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        // Cancel the timeout if value changes (also on delay change or unmount)
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}
