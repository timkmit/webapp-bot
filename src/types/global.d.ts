declare const __IS_DEV__: boolean
declare const __API__: string

type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>
      }
    : T

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T
}

type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>
