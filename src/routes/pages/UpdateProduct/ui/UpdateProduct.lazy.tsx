import { lazy } from 'react'

export const LazyUpdateProductPage = lazy(async () => await import('./UpdateProduct'))
