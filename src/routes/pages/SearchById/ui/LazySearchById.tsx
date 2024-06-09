import { lazy } from 'react'

export const LazySearchById = lazy(async () => await import('./SearchById'))
