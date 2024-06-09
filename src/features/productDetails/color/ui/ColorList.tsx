import { Button, HStack, Text, VStack } from '@/components/ui'
import { FC } from 'react'
import { useGetColorByCategoryQuery } from '../model/api/colorApi'
import { ColorCard } from './ColorCard'
import { useSearchPageActions } from '@/routes/pages/SearchPage/model/slice/SearchPageSlice'
import { useAppSelector } from '@/hooks'

export const ColorList: FC = () => {
    const {
        details: { category },
    } = useAppSelector((state) => state.searchPage)
    const { data } = useGetColorByCategoryQuery(category || [])
    const { colors } = data || { colors: [] }
    const { setCurrentStage, addColor, deleteColor } = useSearchPageActions()

    return (
        <VStack gap={4}>
            <Text className="text-center" color="subtitle" size="larger">
                Цвет
            </Text>

            <Button className="text-4xl m-4" onClick={() => addColor(colors)}>
                Все
            </Button>

            <div className="grid grid-cols-2 gap-2">
                {colors.map((color) => (
                    <ColorCard onDelete={() => deleteColor(color)} color={color} onClick={() => addColor([color])} />
                ))}
            </div>

            <HStack className="w-full" gap={3}>
                <Button className="w-full" onClick={() => setCurrentStage(-1)}>
                    Назад
                </Button>
                <Button className="w-full" onClick={() => setCurrentStage(1)}>
                    Далее
                </Button>
            </HStack>
        </VStack>
    )
}
