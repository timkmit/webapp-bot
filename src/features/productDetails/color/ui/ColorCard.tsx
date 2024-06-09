import { Card, Text } from '@/components/ui'
import { useAppSelector } from '@/hooks'
import { FC } from 'react'

interface ColorCardProps {
    onClick: () => void
    onDelete: () => void
    color: string
}

export const ColorCard: FC<ColorCardProps> = ({ onClick, color, onDelete }) => {
    const {
        details: { color: colors },
    } = useAppSelector((state) => state.searchPage)
    const is_selected = colors.find((rx_color) => color === rx_color)

    return (
        <Card
            style={{ backgroundColor: is_selected ? 'rgb(148 163 184)' : '' }}
            onClick={is_selected ? onDelete : onClick}
            className="active:bg-slate-400 transition-all p-4"
        >
            <Text color="link" size="large">
                Цвет: {color}
            </Text>
        </Card>
    )
}
