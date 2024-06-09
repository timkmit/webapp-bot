import { lazy } from 'react'

export const LazySearchPage = lazy(async () => await import('./SearchPage'))
