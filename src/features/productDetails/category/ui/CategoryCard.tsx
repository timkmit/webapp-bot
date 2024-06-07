import { Card, Text, VStack } from '@/components/ui'
import { Category } from '../model/types/Category'
import { FC } from 'react'
import { useAppSelector } from '@/hooks'

interface CategoryCardProps {
    category: Category
    onClick: () => void
    onDelete: () => void
}

// Добавить поддержку выбора
export const CategoryCard: FC<CategoryCardProps> = ({ category, onClick, onDelete }) => {
    const {
        details: { category: categories },
    } = useAppSelector((state) => state.searchPage)
    const { Product, name } = category
    const is_selected = !!categories.find(({ id }) => id === category.id)

    return (
        <Card
            style={{ backgroundColor: is_selected ? 'rgb(148 163 184)' : '' }}
            onClick={is_selected ? onDelete : onClick}
            padding="4"
            className="active:bg-slate-400 transition-all rounded cursor-pointer"
        >
            <VStack justifyContent="center" alignItems="center" gap={5}>
                {Product?.[0]?.images?.[0] ? <img src={__API__ + '/' + Product?.[0]?.images?.[0]} alt={name} /> : null}
                <Text color="link" size="large" className="text-center">
                    {name}
                </Text>
            </VStack>
        </Card>
    )
}
