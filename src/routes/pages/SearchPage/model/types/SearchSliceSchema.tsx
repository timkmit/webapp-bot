import { Category } from '@/features/productDetails/category'

export interface SearchPageSchema {
    current_stage: number
    details: {
        category: Category[]
        color: string[]
        years: { lte?: number; gte?: number }
        price: { lte?: number; gte?: number }
        count: { lte?: number; gte?: number }
    }
}
