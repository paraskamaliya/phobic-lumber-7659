import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";

export const PrivateRoute = ({ children }) => {
    const { login } = useContext(AuthContext);
    return login ? children : <Navigate to={"/login"} />
}