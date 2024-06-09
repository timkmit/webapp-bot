import { useEffect, useState } from 'react'

function convertToBase64(file: File, onSuccess: (res: string) => void) {
    const reader = new FileReader()
    reader.onload = () => onSuccess(reader.result as string)
    reader.readAsDataURL(file)
}

export const useGetDataUrls = (files: FileList | null) => {
    const [images, setImages] = useState<string[]>([])

    useEffect(() => {
        setImages([])
        if (files) {
            for (let i = 0; i < files.length; i++) {
                convertToBase64(files[i], (res) => setImages((prev) => [...prev, res]))
            }
        }
    }, [files])

    if (!files) {
        return []
    }

    return images
}
