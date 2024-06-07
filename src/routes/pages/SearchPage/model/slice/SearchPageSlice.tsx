import { PayloadAction } from '@reduxjs/toolkit'
import { SearchPageSchema } from '../types/SearchSliceSchema'
import { buildSlice } from '@/lib/store/buildSlice'
import { Category } from '@/features/productDetails/category'

const initialState: SearchPageSchema = {
    current_stage: 0,
    details: {
        category: [],
        color: [],
        count: {},
        price: {},
        years: {},
    },
}

interface AddNumberDetailDto {
    detail: 'count' | 'price' | 'years'
    key: 'gte' | 'lte'
    value: number
}

const searchPageSlice = buildSlice({
    name: 'searchPage',
    initialState,
    reducers: {
        addCategories: (store, action: PayloadAction<Category[]>) => {
            store.details.category.push(...action.payload)
        },
        deleteCategory: (store, action: PayloadAction<number>) => {
            store.details.category = store.details.category.filter(({ id }) => id !== action.payload)
        },
        addColor: (store, action: PayloadAction<string[]>) => {
            store.details.color.push(...action.payload)
        },
        deleteColor: (store, action: PayloadAction<string>) => {
            store.details.color = store.details.color.filter((color) => color !== action.payload)
        },
        addNumberDetail: (store, action: PayloadAction<AddNumberDetailDto>) => {
            const { detail, key, value } = action.payload
            store.details[detail][key] = value
        },

        setCurrentStage: (store, action: PayloadAction<number>) => {
            store.current_stage += action.payload
        },
    },
})

export const { reducer: SearchPageReducer, useActions: useSearchPageActions } = searchPageSlice
