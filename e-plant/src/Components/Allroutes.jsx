import { Route, Routes } from "react-router-dom"
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Notfound from "../Pages/Notfound";
import Products from "../Pages/Products";
import Productpage from "../Pages/Productpage";
import Adminhome from "../Admin Page/Adminhome";
function Allroutes() {
    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/products/:id" element={<Productpage />} />
        <Route path="/admin/home" element={<Adminhome />} />
    </Routes>
}
export default Allroutes;