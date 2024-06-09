import { AppDispatch } from '@/providers/StoreProvider/storeConfig/store'
import { useDispatch } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()
