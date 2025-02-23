import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./components/account/Login";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Global/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./redux/productsSlice";
import { useEffect } from "react";
import { WishListProvider } from "./context/WIshListProvider";

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <CustomCursor />
      <WishListProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </WishListProvider>
    </>
  );
}

export default App;
