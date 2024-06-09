import { Button, Text, VStack } from '@/components/ui'
import { useGetAllCategoriesQuery } from '../model/api/categoryApi'
import { FC } from 'react'
import { CategoryCard } from './CategoryCard'
import { useSearchPageActions } from '@/routes/pages/SearchPage/model/slice/SearchPageSlice'

export const CategoryList: FC = () => {
    const { data: categories } = useGetAllCategoriesQuery()
    console.log(categories)
    const { setCurrentStage, addCategories, deleteCategory } = useSearchPageActions()

    return (
        <VStack gap={4}>
            <Text className="text-center" color="subtitle" size="larger">
                Категории
            </Text>

            {categories?.length !== 0 && categories?.length ? (
                <>
                    <Button className="text-4xl m-4" onClick={() => addCategories(categories || [])}>
                        Все
                    </Button>

                    <div className="grid gap-2 grid-cols-2 justify-center">
                        {categories?.map((category) => (
                            <CategoryCard
                                key={category.id}
                                onClick={() => addCategories([category])}
                                onDelete={() => deleteCategory(category.id)}
                                category={category}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center">
                    <Text>Простите, категорий нет, но вы можете их добавить!</Text>
                </div>
            )}

            <Button className="w-full" onClick={() => setCurrentStage(1)}>
                Далее
            </Button>
        </VStack>
    )
}
