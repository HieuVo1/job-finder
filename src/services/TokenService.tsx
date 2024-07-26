import { TokenInfo } from "../pages/login/Login.api";

export const getToken = (): TokenInfo | null => {
    try {
        const token = localStorage.getItem(tokenKey);
        if (token === null) {
            return null;
        }
        return JSON.parse(token);
    } catch (error) {
        console.log('Invalid Token. Redirecting to /login');
        deleteToken();
        return null;
    }
};

export const setToken = (_tokenKey: string, newToken: TokenInfo): void => {
    localStorage.setItem(_tokenKey, JSON.stringify(newToken));
};

export const deleteToken = () => {
    localStorage.clear();
};

export const IsAuthenticated = () => {
    const tokenInfo: TokenInfo | null = getToken();
    return tokenInfo !== null;
};


const TokenService = {
    getToken,
    deleteToken,
    setToken,
    IsAuthenticated
};
export default TokenService;

export const tokenKey = 'token';