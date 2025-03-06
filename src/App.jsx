import { Navigate, Route, Routes, useLocation } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./components/account/Login";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Global/Header";
import Footer from "./components/Global/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./redux/productsSlice";
import { useEffect } from "react";
import Account from "./components/account/Account";
import Register from "./components/account/Register";
import Products from "./pages/Products";
import ScrollToTop from "./components/Global/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WishListProvider } from "./context/WishListProvider";
import CheckOut from "./pages/CheckOut";
function App() {
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.filteredProducts);
  const location = useLocation(); 
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const isCheckoutPage = location.pathname === "/check-out"; 
  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <CustomCursor />
      <WishListProvider>
        {!isCheckoutPage && <Header currentUser={currentUser} />}
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/account" /> : <Login />}
          />
          <Route
            path="/register"
            element={currentUser ? <Navigate to="/account" /> : <Register />}
          />
          <Route
            path="/account"
            element={currentUser ? <Account /> : <Navigate to="/login" />}
          />
          <Route path="/products" element={<Products products={products} />} />
          <Route path="/check-out" element={currentUser ? <CheckOut /> : <Navigate to="/" />} />

        </Routes>
        {!isCheckoutPage && <Footer />}
      </WishListProvider>
    </>
  );
}

export default App;
