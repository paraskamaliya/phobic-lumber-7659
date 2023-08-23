import { Route, Routes } from "react-router-dom"
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Notfound from "../Pages/Notfound";
import Products from "../Pages/Products";
function Allroutes() {
    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/products/:id" />
    </Routes>
}
export default Allroutes;