// @ts-nocheck
import { Button, FileUploader, Input, Page, Select, Text, VStack } from '@/components/ui'
import { tg } from '@/config/TG'
import { useGetDataUrls, ProductCard } from '@/features/product'
import { usePostProductMutation } from '@/features/product/model/api/productApi'
import { Product } from '@/features/product/model/types/Product'
import { useGetAllCategoriesQuery } from '@/features/productDetails/category/model/api/categoryApi'
import { useState } from 'react'

const PostProductPage = () => {
    const [postProduct] = usePostProductMutation()
    const { data: categories, isSuccess } = useGetAllCategoriesQuery()
    const [product, setProduct] = useState<Omit<Product, 'id'>>({
        //@ts-ignore
        category: categories?.find(({ id }) => id === 1) || { id: 1, name: '' },
        category_id: 1,
        color: '',
        images: [],
        name: '',
        visibility: true,
        article_number: '',
    })
    const [files, setFiles] = useState<FileList | null>(null)
    const images = useGetDataUrls(files)
    const [isFocused, setIsFocused] = useState<boolean>(false)

    const onFocused = () => setIsFocused(true)

    const onBlured = () => setIsFocused(false)

    const onChangeHandler = <T extends keyof Product>(key: T, value: Product[T]) => {
        setProduct((prev) => ({ ...prev, [key]: value }))
        if (key === 'category_id') {
            //@ts-ignore
            setProduct((prev) => ({
                ...prev,
                category: categories?.find(({ id }) => id === value) || { id: 1, name: '' },
            }))
        }
    }

    // useEffect(() => {
    //     const setReactiveImgs = async () => {
    //         if (files) {
    //             const dataUrls = await getDataUrls(files)
    //             console.log(dataUrls)
    //             setImages(dataUrls)
    //         }
    //     }
    //     setReactiveImgs()
    // }, [files])

    return (
        <Page>
            <VStack gap={4}>
                <ProductCard images={images} product={{ ...product, id: 1 }} />

                <VStack gap={4}>
                    <Text size="larger" className="text-center">
                        Создать
                    </Text>
                    <VStack className="p-4" gap={3}>
                        <Input
                            onFocus={onFocused}
                            onBlur={onBlured}
                            top="Имя"
                            placeholder="Имя"
                            onChange={(e) => onChangeHandler('name', e.target.value)}
                            value={product.name}
                        />
                        <Input
                            onFocus={onFocused}
                            onBlur={onBlured}
                            top="Арктикул"
                            placeholder="Арктикул"
                            onChange={(e) => onChangeHandler('article_number', e.target.value)}
                            value={product.article_number}
                        />
                        {isSuccess && (
                            <Select
                                onFocus={onFocused}
                                onBlur={onBlured}
                                top="Категория"
                                onChange={(e) => onChangeHandler('category_id', +e)}
                                options={categories?.map(({ id, name }) => ({ key: id, value: name }))}
                                value={product.category_id}
                            />
                        )}
                        <Input
                            onFocus={onFocused}
                            onBlur={onBlured}
                            top="Цвет"
                            placeholder="Цвет"
                            onChange={(e) => onChangeHandler('color', e.target.value)}
                            value={product.color || ''}
                        />
                        <Input
                            onFocus={onFocused}
                            onBlur={onBlured}
                            top="Кол-во на складе"
                            placeholder="Кол-во на складе"
                            type="number"
                            onChange={(e) => onChangeHandler('count', Number(e.target.value))}
                            value={product.count}
                        />
                        <Input
                            onFocus={onFocused}
                            onBlur={onBlured}
                            top="Цена"
                            placeholder="Цена"
                            type="number"
                            onChange={(e) => onChangeHandler('price', Number(e.target.value))}
                            value={product.price}
                        />
                        <Input
                            onFocus={onFocused}
                            onBlur={onBlured}
                            top="Год"
                            placeholder="Год"
                            type="number"
                            onChange={(e) => onChangeHandler('year', Number(e.target.value))}
                            value={product.year}
                        />
                        <FileUploader files={files} onFileChanges={setFiles} />

                        <Button
                            // disabled={
                            //     !(
                            //         product.article_number &&
                            //         product.category &&
                            //         product.category_id &&
                            //         product.color &&
                            //         (product.count || product.count === 0) &&
                            //         files?.length !== 0 &&
                            //         product.name &&
                            //         (product.price || product.price === 0) &&
                            //         (product.price || product.price === 0)
                            //     )
                            // }
                            className="w-full"
                            onClick={() => {
                                tg.sendData(JSON.stringify(product))
                                const formData = new FormData()
                                const { category_id, count, color, name, price, visibility, category, year } = product
                                if (files?.length) {
                                    for (let i = 0; i < files.length; i++) {
                                        formData.append(`file_${i + 1}`, files.item(i))
                                    }
                                }
                                formData.append('category_id', JSON.stringify(category_id))
                                formData.append('count', JSON.stringify(count))
                                formData.append('color', color)
                                formData.append('name', name)
                                formData.append('price', JSON.stringify(price))
                                formData.append('visibility', JSON.stringify(visibility))
                                formData.append('category', JSON.stringify(category))
                                formData.append('year', JSON.stringify(year))
                                formData.append('article_number', product.article_number)
                                postProduct(formData)
                            }}
                        >
                            Добавить
                        </Button>
                    </VStack>
                </VStack>
            </VStack>
            {isFocused && <div className="p-40" />}
        </Page>
    )
}
export default PostProductPage
