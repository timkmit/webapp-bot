import { configureStore } from '@reduxjs/toolkit'
import { rtkApi } from '@/lib/api/rtkApi'
import { SearchPageReducer } from '@/routes/pages/SearchPage/model/slice/SearchPageSlice'

export const createReduxStore = () => {
    const store = configureStore({
        reducer: {
            [rtkApi.reducerPath]: rtkApi.reducer,
            searchPage: SearchPageReducer,
        },
        devTools: __IS_DEV__,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(rtkApi.middleware),
    })

    return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
export type RootState = ReturnType<ReturnType<typeof createReduxStore>['getState']>
