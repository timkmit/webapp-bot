import { Button, HStack, Input, Text, VStack } from '@/components/ui'
import { useAppSelector } from '@/hooks'
import { useSearchPageActions } from '@/routes/pages/SearchPage/model/slice/SearchPageSlice'
import { FC } from 'react'

interface NumberForm {
    title: string
    detail: 'price' | 'years' | 'count'
}

export const NumberForm: FC<NumberForm> = ({ title, detail }) => {
    const { addNumberDetail, setCurrentStage } = useSearchPageActions()
    const {
        details: { [detail]: value },
    } = useAppSelector((state) => state.searchPage!)

    return (
        <VStack gap={4}>
            <Text className="text-center" color="subtitle" size="larger">
                {title}
            </Text>

            <VStack gap={3}>
                <Input
                    top="От"
                    key={title + '0'}
                    type="number"
                    value={value?.gte}
                    placeholder="От"
                    onChange={(e) => addNumberDetail({ detail, value: +e.target.value, key: 'gte' })}
                />
                <Input
                    top="До"
                    key={title + '1'}
                    type="number"
                    value={value?.lte}
                    placeholder="До"
                    onChange={(e) => addNumberDetail({ detail, value: +e.target.value, key: 'lte' })}
                />
            </VStack>

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
