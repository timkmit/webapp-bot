// @ts-nocheck
import { Button, FileUploader, Header, HStack, Input, Loader, Page, Text, VStack } from '@/components/ui'
import { Select } from '@/components/ui/Select/Select'
import { tg } from '@/config/TG'
import { useGetDataUrls } from '@/features/product'
import { useGetProductByIdQuery, useUpdatePostMutation } from '@/features/product/model/api/productApi'
import { Product } from '@/features/product/model/types/Product'
import { ProductCard } from '@/features/product/ui/ProductCard'
import { useGetAllCategoriesQuery } from '@/features/productDetails/category/model/api/categoryApi'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {
    const [updatePost] = useUpdatePostMutation()
    const { id } = useParams<{ id: string }>()
    const { data: categories, isSuccess } = useGetAllCategoriesQuery()
    const { data: product, isLoading } = useGetProductByIdQuery(Number(id || 1))
    const [updatedProduct, setUpdatedProduct] = useState<Partial<Product> | undefined>()
    const [files, setFiles] = useState<FileList | null>(null)
    const nav = useNavigate()
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const images = useGetDataUrls(files)

    const onFocused = () => setIsFocused(true)

    const onBlured = () => setIsFocused(false)

    useEffect(() => {
        if (product) {
            setUpdatedProduct(product)
        }
    }, [product])

    const onChangeHandler = <T extends keyof Product>(key: T, value: Product[T]) => {
        console.log(updatedProduct)
        //@ts-ignore
        setUpdatedProduct((prev) => ({ ...prev, [key]: value }))
        if (key === 'category_id') {
            //@ts-ignore
            setUpdatedProduct((prev) => ({ ...prev, category: categories?.find(({ id }) => id === value) }))
        }
    }

    if (isLoading) {
        return (
            <HStack className="w-screen h-screen" justifyContent="center" alignItems="center">
                <Loader />
            </HStack>
        )
    }
    return (
        <Page>
            <Header onClick={() => nav(-1)} />

            <VStack gap={4}>
                {/* @ts-ignore */}
                <ProductCard images={images} product={updatedProduct || product!} isLoading={isLoading} />

                <VStack gap={4}>
                    <Text size="larger" className="text-center">
                        Редактирование
                    </Text>
                    <VStack className="p-4" gap={3}>
                        <Input
                            onFocus={onFocused}
                            onBlur={onBlured}
                            top="Имя"
                            placeholder="Имя"
                            onChange={(e) => onChangeHandler('name', e.target.value)}
                            value={updatedProduct?.name}
                        />
                        <Input
                            onFocus={onFocused}
                            onBlur={onBlured}
                            top="Арктикул"
                            placeholder="Арктикул"
                            onChange={(e) => onChangeHandler('article_number', e.target.value)}
                            value={updatedProduct?.article_number}
                        />
                        {isSuccess && (
                            <Select
                                onFocus={onFocused}
                                onBlur={onBlured}
                                top="Категория"
                                onChange={(e) => onChangeHandler('category_id', +e)}
                                options={categories?.map(({ id, name }) => ({ key: id, value: name }))}
                                value={updatedProduct?.category_id}
                            />
                        )}
                        <Input
                            onFocus={onFocused}
                            onBlur={onBlured}
                            top="Цвет"
                            placeholder="Цвет"
                            onChange={(e) => onChangeHandler('color', e.target.value)}
                            value={updatedProduct?.color}
                        />
                        <Input
                            onFocus={onFocused}
                            onBlur={onBlured}
                            top="Кол-во на складе"
                            placeholder="Кол-во на складе"
                            type="number"
                            onChange={(e) => onChangeHandler('count', +e.target.value)}
                            value={updatedProduct?.count}
                        />
                        <Input
                            onFocus={onFocused}
                            onBlur={onBlured}
                            top="Цена"
                            placeholder="Цена"
                            type="number"
                            onChange={(e) => onChangeHandler('price', +e.target.value)}
                            value={updatedProduct?.price}
                        />
                        <Input
                            onFocus={onFocused}
                            onBlur={onBlured}
                            top="Год"
                            placeholder="Год"
                            type="number"
                            onChange={(e) => onChangeHandler('year', +e.target.value)}
                            value={updatedProduct?.year}
                        />
                        <FileUploader files={files} onFileChanges={setFiles} fileNumbers={product?.images.length} />

                        <Button
                            // disabled={
                            //     !(
                            //         updatedProduct?.article_number &&
                            //         updatedProduct?.category &&
                            //         updatedProduct?.category_id &&
                            //         updatedProduct?.color &&
                            //         (updatedProduct?.count || updatedProduct?.count === 0) &&
                            //         (files?.length !== 0 || product?.images.length !== 0) &&
                            //         updatedProduct?.name &&
                            //         (updatedProduct?.price || updatedProduct?.price === 0) &&
                            //         (updatedProduct?.price || updatedProduct?.price === 0)
                            //     )
                            // }
                            className="w-full"
                            onClick={() => {
                                tg.sendData(JSON.stringify(updatedProduct))

                                const formData = new FormData()
                                if (files?.length) {
                                    for (let i = 0; i < files.length; i++) {
                                        formData.append(`file_${i + 1}`, files.item(i))
                                    }
                                } else {
                                    formData.append('is_images_changed', '1')
                                }
                                formData.append('count', JSON.stringify(updatedProduct?.count))
                                formData.append('color', updatedProduct?.color)
                                formData.append('name', updatedProduct?.name)
                                formData.append('price', JSON.stringify(updatedProduct?.price))
                                formData.append('visibility', JSON.stringify(updatedProduct?.visibility))
                                formData.append('category', JSON.stringify(updatedProduct?.category))
                                formData.append('year', JSON.stringify(updatedProduct?.year))
                                formData.append('article_number', updatedProduct?.article_number)
                                updatePost({ id: product!.id, product: formData })
                            }}
                        >
                            Обновить
                        </Button>
                    </VStack>
                </VStack>
            </VStack>
            {isFocused && <div className="p-40" />}
        </Page>
    )
}

export default UpdateProduct
