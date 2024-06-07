import { cn } from '@/utils/classNames'
import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import { Text } from '../Text/Text'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'onClick'> {
    children: ReactNode
    onClick?: () => void
    className?: string
}

export const Button: FC<ButtonProps> = ({ children, onClick, className, ...otherProps }) => {
    return (
        <button
            onClick={onClick}
            className={cn(`bg-[--tg-theme-button-color] rounded pt-2 pb-2 pr-4 pl-4`, {}, [className])}
            {...otherProps}
        >
            <Text color="button" size="larger">
                {children}
            </Text>
        </button>
    )
}
