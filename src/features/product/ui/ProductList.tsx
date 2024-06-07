import { FC, useState } from 'react'
import { Product } from '../model/types/Product'
import { ProductCard } from './ProductCard'

interface ProductListProps {
    products: Product[]
    isLoading?: boolean
}

export const ProductList: FC<ProductListProps> = ({ products, isLoading }) => {
    const [product, setProduct] = useState<Product[]>(products)
    console.log(product)

    return (
        <div className="grid grid-cols-2 gap-2">
            {product.map((product) => (
                <ProductCard with_buttons setProduct={setProduct} product={product} isLoading={isLoading} />
            ))}
        </div>
    )
}
