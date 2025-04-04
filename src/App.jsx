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
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { fetchProducts } from "./redux/productsSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundPage from "./pages/NotFoundPage";
import Adresses from "./pages/Adresses";
import OrderCompleted from "./pages/OrderCompleted";
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import ForgetPassword from "./pages/ForgetPassword";
import Loader from "./components/Global/Loader";
import { WishListProvider } from "./context/WishListProvider";

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.filteredProducts);
  const currentUser = useSelector((state) => state.users?.currentUser);
  const location = useLocation();
  const cart = currentUser?.cart || [];
  const admin = JSON.parse(localStorage.getItem("admin"));

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); 
    return () => clearTimeout(timer);
  }, [location.pathname]); 

  const isCheckoutPage = location.pathname === "/check-out";
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleThemeChange = useCallback((newTheme) => {
    setTheme(newTheme);
  }, []);

  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <CustomCursor />
      <FloatingButtons onThemeChange={handleThemeChange} />

      {loading && <Loader />} 

      {!loading && (
        <WishListProvider>
          {!isCheckoutPage && <Header currentUser={currentUser} />}
          <Routes>
            <Route path="/" element={<Home products={products} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={currentUser ? <Navigate to="/Account" /> : <Login />} />
            <Route path="/register" element={currentUser ? <Navigate to="/Account" /> : <Register />} />
            <Route path="/Account" element={currentUser ? <Account /> : <Navigate to="/login" />} />
            <Route path="/products" element={<Products products={products} />} />
            <Route path="/products/:id" element={<SinglePage />} />
            <Route path="/FAQs" element={<FAQ />} />
            <Route path="/check-out" element={currentUser && cart.length > 0 ? <CheckOut /> : <Navigate to="/" />} />
            <Route path="/Admin-login" element={<AdminLogin />} />
            <Route path="/Admin" element={admin ? <AdminDashboard /> : <Navigate to="/" />} />
            <Route path='/Adresses' element={currentUser ? <Adresses /> : <Navigate to="/" />} />
            <Route path='/order-completed' element={currentUser ? <OrderCompleted /> : <Navigate to="/" />} />
            <Route path='/contact' element={<Contact />} />
            <Route path="/CONCEPT'S-Beauty-Blogs" element={<Blog />} />
            <Route path='account/recover' element={currentUser ? <ForgetPassword /> : <Navigate to="/"></Navigate>} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
          {!isCheckoutPage && <Footer />}
        </WishListProvider>
      )}
    </>
  );
}

export default App;
