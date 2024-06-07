import { Category } from '@/features/productDetails/category'
import { rtkApi } from '@/lib/api/rtkApi'

const colorApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getColorByCategory: build.query<{ colors: string[] }, Category[]>({
            query: (categories) => `/api/product/color?categories=${JSON.stringify(categories.map((cat) => cat.id))}`,
        }),
    }),
})

export const { useGetColorByCategoryQuery } = colorApi
