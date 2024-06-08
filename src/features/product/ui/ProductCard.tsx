import { Dispatch, FC, SetStateAction } from 'react'
import { Product } from '../model/types/Product'
import { Button, Card, HStack, Loader, Text, VStack } from '@/components/ui'
import { Slider } from '@/components/ui/Slider/Slider'
import { useNavigate } from 'react-router-dom'
import { getRouteUpdateProduct } from '@/routes/routeConfig/routes'
import { useDeleteProductMutation } from '../model/api/productApi'

interface ProductCardProps {
    product: Product
    isLoading?: boolean
    setProduct?: Dispatch<SetStateAction<Product[]>>
    with_buttons?: boolean
    images?: string[]
}

export const ProductCard: FC<ProductCardProps> = ({
    product,
    isLoading,
    setProduct,
    with_buttons,
    images: inputImages,
}) => {
    const nav = useNavigate()
    const [deleteProduct] = useDeleteProductMutation()
    const { category, color, count, name, id = 1, price, images } = product

    if (isLoading) {
        return (
            <HStack justifyContent="center" alignItems="center" className="w-full h-full">
                <Loader />
            </HStack>
        )
    }

    return (
        <Card padding="2">
            <VStack gap={3}>
                <Slider
                    images={
                        inputImages?.length !== 0 && inputImages
                            ? inputImages
                            : images.map((img) => 'https://ilshaw.site' + '/' + img)
                    }
                />
                <VStack gap={1}>
                    <Text size="larger" className="font-bold">
                        {name}
                    </Text>
                    <Text>Категория: {category.name}</Text>
                    <Text>Цвет: {color}</Text>
                    <Text>Кол-во: {count}</Text>
                    <Text>Цена: {price}</Text>
                </VStack>
                {with_buttons && (
                    <VStack className="w-full" gap={2}>
                        <Button
                            className="w-full"
                            onClick={() => {
                                deleteProduct(id)
                                setProduct?.((prev) => prev.filter(({ id: product_id }) => product_id !== id))
                            }}
                        >
                            Удалить
                        </Button>
                        <Button className="w-full" onClick={() => nav(getRouteUpdateProduct(id))}>
                            Обновить
                        </Button>
                    </VStack>
                )}
            </VStack>
        </Card>
    )
}
