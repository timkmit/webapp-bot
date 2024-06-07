import { cn } from '@/utils/classNames'
import { FC, InputHTMLAttributes, useId } from 'react'
import { Text } from '../Text/Text'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    top?: string
}

export const Input: FC<InputProps> = ({ className, top, ...otherProps }) => {
    const id = useId()

    if (!top) {
        return (
            <label htmlFor={id}>
                <input
                    id={id}
                    className={cn(
                        'pt-2 pb-2 pr-4 pl-4 rounded text-[--tg-theme-text-color] bg-[--tg-theme-secondary-bg-color] w-full',
                        {},
                        [className]
                    )}
                    {...otherProps}
                />
            </label>
        )
    }

    return (
        <label htmlFor={id} className="grid grid-cols-[1fr_2fr] gap-3 justify-center items-center">
            <Text>{top}</Text>
            <input
                id={id}
                className={cn(
                    'pt-2 pb-2 pr-4 pl-4 rounded text-[--tg-theme-text-color] bg-[--tg-theme-secondary-bg-color] w-full',
                    {},
                    [className]
                )}
                {...otherProps}
            />
        </label>
    )
}
