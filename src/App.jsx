import { Navigate, Route, Routes, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./components/account/Login";
import Register from "./components/account/Register";
import Account from "./components/account/Account";
import Products from "./pages/Products";
import SinglePage from "./pages/SinglePage";
import FAQ from "./pages/FAQ";
import CheckOut from "./pages/CheckOut";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Global/Header";
import Footer from "./components/Global/Footer";
import FloatingButtons from "./components/Global/FloatingButtons";
import ScrollToTop from "./components/Global/ScrollToTop";
import { WishListProvider } from "./context/WishListProvider";
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard'
import { fetchProducts } from "./redux/productsSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundPage from "./pages/NotFoundPage";
import Adresses from "./pages/Adresses";

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.filteredProducts);
  const currentUser = useSelector((state) => state.users?.currentUser);
  const location = useLocation();
  const cart = currentUser?.cart || [];
  const admin = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const isCheckoutPage = location.pathname === "/check-out";

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [language, setLanguage] = useState("en");

  const handleThemeChange = useCallback((newTheme) => {
    setTheme(newTheme);
  }, []);

  const handleLanguageChange = useCallback((newLanguage) => {
    setLanguage(newLanguage);
  }, []);

  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <CustomCursor />
      <FloatingButtons
        onThemeChange={handleThemeChange}
        onLanguageChange={handleLanguageChange}
      />
      <WishListProvider>
        {!isCheckoutPage && <Header currentUser={currentUser} />}
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={currentUser ? <Navigate to="/account" /> : <Login />} />
          <Route path="/register" element={currentUser ? <Navigate to="/account" /> : <Register />} />
          <Route path="/account" element={currentUser ? <Account /> : <Navigate to="/login" />} />
          <Route path="/products" element={<Products products={products} />} />
          <Route path="/products/:id" element={<SinglePage />} />
          <Route path="/FAQs" element={<FAQ />} />
          <Route path="/check-out" element={currentUser && cart.length > 0 ? <CheckOut /> : <Navigate to="/" />} />
          <Route path="/Admin-login" element={<AdminLogin />} />
          <Route path="/Admin" element={admin ? <AdminDashboard /> : <Navigate to="/" />} />
          <Route path='/Adresses' element={<Adresses/>} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        {!isCheckoutPage && <Footer />}
      </WishListProvider>
    </>
  );
}

export default App;
