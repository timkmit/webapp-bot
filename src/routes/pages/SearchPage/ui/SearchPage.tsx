import { Header, Page, VStack } from '@/components/ui'
import { tg } from '@/config/TG'
import { CategoryList } from '@/features/productDetails/category'
import { ColorList } from '@/features/productDetails/color'
import { NumberForm } from '@/features/productDetails/numberDetails/NumberForm'
import { ProductSection } from '@/features/productDetails/product/ProductSection'
import { useAppSelector } from '@/hooks'
import { useSearchPageActions } from '../model/slice/SearchPageSlice'

const SearchPage = () => {
    const { current_stage } = useAppSelector((state) => state.searchPage!)
    const { setCurrentStage } = useSearchPageActions()

    const stages = [
        <CategoryList />,
        <ColorList />,
        <NumberForm title="Года" detail="years" />,
        <NumberForm title="Цена" detail="price" />,
        <NumberForm title="Кол-во на складе" detail="count" />,
        <ProductSection />,
    ]
    return (
        <Page>
            {current_stage === 5 && <Header onClick={() => setCurrentStage(-1)} />}
            <VStack gap={4} className="pt-2">
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                        className="text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                        style={{
                            width: `${Math.floor((current_stage / stages.length) * 100)}%`,
                            backgroundColor: tg.themeParams.section_bg_color,
                        }}
                    >
                        {`${Math.floor((current_stage / stages.length) * 100)}%`}
                    </div>
                </div>

                {stages[current_stage]}
            </VStack>
        </Page>
    )
}

export default SearchPage
