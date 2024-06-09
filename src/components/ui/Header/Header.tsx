import { FC } from 'react'
import { Button } from '../Button/Button'

interface HeaderProps {
    onClick: () => void
}

export const Header: FC<HeaderProps> = ({ onClick }) => {
    return (
        <div className="flex items-center justify-start w-full">
            <Button onClick={onClick}>Назад</Button>
        </div>
    )
}
