import { RouteProps } from 'react-router-dom'
import { AppRoutes, getRouteSearch, getRoutePostProduct, getRouteUpdateProduct, getRouteSearchById } from './routes'
import { LazySearchPage } from '../pages/SearchPage'
import { LazyUpdateProductPage } from '../pages/UpdateProduct'
import { LazyPostProductPage } from '../pages/PostProduct'
import { LazySearchById } from '../pages/SearchById'

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.POST]: {
        path: getRoutePostProduct(),
        element: <LazyPostProductPage />,
    },
    [AppRoutes.UPDATE]: {
        path: getRouteUpdateProduct(':id'),
        element: <LazyUpdateProductPage />,
    },
    [AppRoutes.SEARCH]: {
        path: getRouteSearch(),
        element: <LazySearchPage />,
    },
    [AppRoutes.SEARCH_BYID]: {
        path: getRouteSearchById(),
        element: <LazySearchById />,
    },
}
