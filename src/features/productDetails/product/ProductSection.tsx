import { HStack, Loader, Text, VStack } from '@/components/ui'
import { useGetProductByDetailsQuery } from '@/features/product/model/api/productApi'
import { ProductList } from '@/features/product/ui/ProductList'
import { useAppSelector } from '@/hooks'

export const ProductSection = () => {
    const { details } = useAppSelector((state) => state.searchPage)
    const formatDetails = () => {
        return {
            categories: JSON.stringify(details.category.map(({ id }) => id)),
            colors: JSON.stringify(details.color),
            year: `${details.years.gte || 0}_${details.years.lte || 10000}`,
            price: `${details.price.gte || 0}_${details.price.lte || 10000}`,
            count: `${details.count.gte || 0}_${details.count.lte || 10000}`,
        }
    }

    const { data: products, isLoading } = useGetProductByDetailsQuery(formatDetails())

    if (isLoading) {
        return (
            <HStack className="w-screen h-screen" justifyContent="center" alignItems="center">
                <Loader />
            </HStack>
        )
    }

    if (!products) {
        return
    }

    return (
        <VStack gap={4}>
            <Text className="text-center" size="larger">
                Ваши Продукты
            </Text>
            <ProductList products={products} isLoading={isLoading} />
        </VStack>
    )
}
