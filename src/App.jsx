import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Global/Header";

function App() {
  return (
    <>
      <CustomCursor />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
