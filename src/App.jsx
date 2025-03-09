import { Navigate, Route, Routes, useLocation } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./components/account/Login";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Global/Header";
import Footer from "./components/Global/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./redux/productsSlice";
import { useEffect, useState } from "react";
import Account from "./components/account/Account";
import Register from "./components/account/Register";
import Products from "./pages/Products";
import ScrollToTop from "./components/Global/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WishListProvider } from "./context/WishListProvider";
import CheckOut from "./pages/CheckOut";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import FloatingButtons from "./components/Global/FloatingButtons";
import SinglePage from "./pages/SinglePage";

function App() {
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.filteredProducts);
  const location = useLocation();
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const isCheckoutPage = location.pathname === "/check-out";
  const admin = JSON.parse(localStorage.getItem("admin")); 
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [language, setLanguage] = useState("en");

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };
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
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={admin ? <AdminDashboard /> : <Navigate to="/" />}
          />
           <Route path="/products/:id" element={<SinglePage />} />
        </Routes>
        {!isCheckoutPage && <Footer />}
      </WishListProvider>
    </>
  );
}

export default App;
