import { Product } from "@/features/product/model/types/Product"

export interface Category {
    id: number
    name: string
    Product: Product[]
}
