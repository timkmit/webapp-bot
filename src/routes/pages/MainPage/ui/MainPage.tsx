import { Button, Page, Text } from '@/components/ui'
import { getRouteSearchById, getRouteSearch, getRoutePostProduct } from '@/routes/routeConfig/routes'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
    const nav = useNavigate()

    return (
        <Page className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-2 items-center">
                <Text className="text-2xl font-semibold mb-4">Навигация</Text>
                <Button onClick={() => nav(getRouteSearchById())}>Поиск по названию</Button>
                <Button onClick={() => nav(getRouteSearch())}>Поиск по параментрам</Button>
                <Button onClick={() => nav(getRoutePostProduct())}>Добавить товар</Button>
            </div>
        </Page>
    )
}

export default MainPage
