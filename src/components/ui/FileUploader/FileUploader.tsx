import { FC, InputHTMLAttributes, useRef } from 'react'
import { Button } from '../Button/Button'

interface FileUploaderProps extends InputHTMLAttributes<HTMLInputElement> {
    onFileChanges: (files: FileList | null) => void
    files: FileList | null
    fileNumbers?: number
}

export const FileUploader: FC<FileUploaderProps> = ({ onFileChanges, files, fileNumbers }) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const onButtonClick = () => {
        inputRef.current?.click()
    }

    return (
        <>
            <input
                type="file"
                className="hidden"
                accept="image/*"
                ref={inputRef}
                onChange={(e) => {
                    onFileChanges(e.target.files)
                }}
                multiple
            />
            <Button onClick={onButtonClick}>
                {files?.length && files.length !== 0
                    ? `${files.length} файла загружено`
                    : fileNumbers
                    ? `${fileNumbers} файла загружено`
                    : 'Загрузите файлы'}
            </Button>
        </>
    )
}
