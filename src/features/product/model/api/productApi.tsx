import { rtkApi } from '@/lib/api/rtkApi'
import { Product } from '../types/Product'

interface ProductByDetailsDto {
    categories: string
    colors: string
    year: string
    price: string
    count: string
}

const productApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<Product[], void>({
            query: () => '/api/product',
        }),

        getProductByDetails: build.query<Product[], ProductByDetailsDto>({
            query: (queryParams) => ({ url: '/api/product/search', params: queryParams }),
        }),

        getProductById: build.query<Product, number>({
            query: (id) => `/api/product/get/${id}`,
        }),

        postProduct: build.mutation<Product, FormData>({
            query: (body) => ({
                url: '/api/product',
                body,
                method: 'POST',
            }),
        }),

        deleteProduct: build.mutation<Product, number>({
            query: (id) => ({ url: `/api/product/${id}`, method: 'DELETE' }),
        }),

        updatePost: build.mutation<Product, { id: number; product: FormData }>({
            query: ({ id, product }) => ({ url: `/api/product/${id}`, body: product, method: 'PUT' }),
        }),

        getByNameId: build.query<Product[], { query: string; page: number }>({
            query: (params) => ({ url: 'api/product/nameid', params: { ...params, take: 5 } }),
        }),
    }),
})

export const {
    useDeleteProductMutation,
    useGetProductByDetailsQuery,
    useGetProductByIdQuery,
    useGetProductsQuery,
    usePostProductMutation,
    useUpdatePostMutation,
    useGetByNameIdQuery,
} = productApi
