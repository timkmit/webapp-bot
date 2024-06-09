import { rtkApi } from '@/lib/api/rtkApi'
import { Category } from '../types/Category'

const categoryApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getAllCategories: build.query<Category[], void>({
            query: () => '/api/category',
        }),
        createCategory: build.mutation<Category, { name: string }>({
            query: (body) => ({ url: '/api/category', body, method: 'POST' }),
        }),
    }),
})

export const { useGetAllCategoriesQuery, useCreateCategoryMutation } = categoryApi
