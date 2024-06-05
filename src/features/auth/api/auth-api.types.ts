export type UserType = {
    id: number,
    email: string
    login: string
}

export type LoginType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}