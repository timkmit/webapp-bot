import { Button, Card, Input, Page, Text } from '@/components/ui'
import { useGetByNameIdQuery } from '@/features/product/model/api/productApi'
import { useDebounce } from '@/hooks'
import { getRouteUpdateProduct } from '@/routes/routeConfig/routes'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchById = () => {
    const [query, setQuery] = useState<string>('')
    const [page, setPage] = useState<number>(0)
    const debouncedQuery = useDebounce(query, 400)
    const { data: products } = useGetByNameIdQuery({ query: debouncedQuery, page })
    const nav = useNavigate()

    useEffect(() => {
        setPage(0)
    }, [debouncedQuery])

    return (
        <Page className="w-screen h-screen flex justify-center items-center flex-col p-4 overflow-x-hidden">
            <Input
                className="w-full"
                value={query}
                onChange={async (e) => {
                    setQuery(e.target.value)
                }}
                placeholder="Поиск"
            />
            <div className="grid grid-cols-1 gap-3 overflow-y-scroll w-full absolute top-[53vh] p-6">
                {products?.map((product) => (
                    <Card padding="2" className="w-full" key={product.id}>
                        <Text
                            className="text-center"
                            onClick={() => nav(getRouteUpdateProduct(product.id))}
                            size="large"
                            color="link"
                        >
                            {product.name}
                        </Text>
                    </Card>
                ))}
                {products?.length !== 0 && <Button onClick={() => setPage((prev) => prev + 1)}>Показать больше</Button>}
            </div>
        </Page>
    )
}

export default SearchById
