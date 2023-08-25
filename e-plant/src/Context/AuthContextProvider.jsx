import { createContext, useState } from "react";
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const login = () => {
        setIsAuth(true);
        localStorage.setItem("login", JSON.stringify(true))
    }
    const logout = () => {
        setIsAuth(false);
        localStorage.setItem("login", JSON.stringify(false))
    }
    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}