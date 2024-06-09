import { FC, useId } from 'react'
import { Text } from '../Text/Text'

interface SelectProps {
    options: {
        key: string | number
        value: string | number
    }[]

    value?: string | number
    onChange: (value: string) => void
    top?: string
}

export const Select: FC<SelectProps> = ({ options, onChange, value, top }) => {
    const id = useId()

    return (
        <label htmlFor={id} className="grid grid-cols-[1fr_2fr] gap-3 justify-center items-center">
            <Text> {top}</Text>
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pt-2 pb-2 pr-4 pl-4 bg-[--tg-theme-secondary-bg-color] text-[--tg-theme-text-color] rounded w-full"
            >
                {options.map((option) => (
                    <option value={option.key} key={option.key}>
                        {option.value}
                    </option>
                ))}
            </select>
        </label>
    )
}
