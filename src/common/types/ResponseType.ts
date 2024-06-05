export type ResponseType<T = {}> = {
    fieldErrors: string[]
    resultCode: number
    messages: string[],
    data: T
}