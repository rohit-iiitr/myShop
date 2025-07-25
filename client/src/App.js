import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Policy from "./pages/Policy.js";
import Contact from "./pages/Contact.js";
import NotFound from "./pages/NotFound.js";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import Dashboard from "./pages/user/Dashboard.js";
import Private from "./components/route/Private.js";
import ForgetPassword from "./pages/user/ForgetPassword.js";
import AdminDashboard from "./pages/Admin/AdminDashboard.js";
import AdminRoute from "./components/route/AdminRoute.js";
import CreateCategory from "./pages/Admin/CreateCategory.js";
import CreateProduct from "./pages/Admin/CreateProduct.js";
import Products from "./pages/Admin/Products.js";
import Users from "./pages/Admin/Users.js";
import AdminOrders from "./pages/Admin/AdminOrders.js";
import UpdateProduct from "./pages/Admin/UpdateProduct.js";
import CategoryProduct from "./pages/user/CreateProduct.js";
import Search from "./pages/user/Search.js";
import ProductDetails from "./pages/user/ProductDetails.js";
import Categories from "./pages/user/Categories.js";
import CartPage from "./pages/user/CartPage.js";
import Profile from "./pages/user/Profile.js";
import Orders from "./pages/user/Orders.js";
// import Background from "./components/layout/Background.js";



function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<Private />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  );
}

export default App;
