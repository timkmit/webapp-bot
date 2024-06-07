import { Category } from "@/features/productDetails/category"

export interface Product {
    id: number
    name: string
    count: number
    price: number
    color: string
    category_id: number
    visibility: boolean
    category: Category
    images: string[]
    year: number
    article_number: string
}
