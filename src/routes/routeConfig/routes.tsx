export enum AppRoutes {
    MAIN = 'main',
    SEARCH = 'search',
    POST = 'post',
    UPDATE = 'update',
    SEARCH_BYID = 'search_byid',
}

export const getRouteMain = () => '/'
export const getRouteSearch = () => '/search/process'
export const getRoutePostProduct = () => '/add'
export const getRouteUpdateProduct = (id: string | number) => '/update/' + id
export const getRouteSearchById = () => '/search/byid'
