import { lazy } from 'react'

export const LazyPostProductPage = lazy(async () => await import('./PostProductPage'))
