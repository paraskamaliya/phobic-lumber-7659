import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";

export const PrivateRoute = ({ children }) => {
    const { login } = useContext(AuthContext);
    const location = useLocation();
    return login ? children : <Navigate state={location.pathname} to={"/login"} />
}