import { Route, Routes } from "react-router-dom"
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Notfound from "../Pages/Notfound";
import Products from "../Pages/Products";
import Productpage from "../Pages/Productpage";
import Adminhome from "../Admin Page/Adminhome";
import Cartpage from "../Pages/Cartpage";
import AdminUsers from "../Admin Page/AdminUsers";
import ProductForm from "../Admin Page/ProductForm";
import Blog from "../Pages/Blog";
import Profile from "../Pages/Profile";
import Checkout from "../Pages/Checkout";
function Allroutes() {
    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/products/:id" element={<Productpage />} />
        <Route path="/admin/home" element={<Adminhome />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/productform" element={<ProductForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<Checkout />} />
    </Routes>
}
export default Allroutes;