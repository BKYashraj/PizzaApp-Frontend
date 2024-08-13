import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/Products/ProductDetails";
import CartDetails from "./pages/Cart/CartDetails";
import Order from "./pages/Order/Order";
import OrderSuccess from "./pages/Order/OrderSuccess";
import RequireAuth from "./components/Auth/RequireAuth";
import OrderNowPage from "./pages/Order/OrderNowPage";
import Addproducts from "./pages/Admin/Addproducts";
import AdminPanel from "./pages/Admin/AdminPanel";
import ViewOrders from "./pages/Admin/ViewOrder";
function App() {
  return (
    <div>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />

          <Route element={<RequireAuth />}>
            <Route path='/order' element={<Order />} />
            <Route path='/order/success' element={<OrderSuccess />} />
            <Route path='/cart' element={<CartDetails />} />
            <Route path='/order/now' element={<OrderNowPage />} />
            <Route path='/admin/addProduct' element={<Addproducts/>} />
            <Route path='/admin' element={<AdminPanel/>} />
            <Route path='/admin/viewOrders' element={<ViewOrders/>} />
          </Route>
 
          <Route path='/product/:productId' element={<ProductDetails />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </>
    </div>
  );
}

export default App;