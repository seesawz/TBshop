import Cookies from 'js-cookie'

const TokenKey = 'auth-token'

export const getToken = () => {
    return Cookies.get(TokenKey)
}

export const setToken = (token:string) => {
    return Cookies.set(TokenKey,token)
}

export const resetToken = () => {
    return Cookies.remove(TokenKey)
}