import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/style/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { LanguageProvider } from "./context/LanguageProvider.jsx";
import './i18next.js';
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
    <LanguageProvider>
      <App />
      </LanguageProvider>
    </BrowserRouter>
  </Provider>
  // </StrictMode>
);
