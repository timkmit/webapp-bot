import { FC, useState } from 'react'

interface SliderProps {
    images: string[]
}

const Image: FC<{ src: string }> = ({ src }) => {
    return <img src={src} alt={src.slice(0, 10)} />
}

export const Slider: FC<SliderProps> = ({ images }) => {
    const [current, setCurrent] = useState(0)

    return (
        <div className="overflow-hidden relative">
            <div
                className={`flex transition ease-out duration-40`}
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {images.map((s) => {
                    return <Image src={s} key={s.slice(0, 200)} />
                })}
            </div>

            <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
                {images.map((s, i) => {
                    return (
                        <div
                            onClick={() => {
                                setCurrent(i)
                            }}
                            key={'circle' + s}
                            className={`rounded-full w-5 h-5 cursor-pointer  ${
                                i == current ? 'bg-white' : 'bg-gray-500'
                            }`}
                        ></div>
                    )
                })}
            </div>
        </div>
    )
}
