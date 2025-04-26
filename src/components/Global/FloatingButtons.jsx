import React, { useState, useEffect, useContext } from "react";
import { Moon, Sun, Globe } from "lucide-react";
import { LanguageContext } from "../../context/LanguageProvider";

const FloatingButtons = ({ onThemeChange }) => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const { changeLanguage } = useContext(LanguageContext);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setDarkMode(savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    onThemeChange(newTheme);
  };

  return (
    <div className="floating-buttons">
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="language-container">
        <button className="language-toggle" onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}   onTouchStart={() => setShowLanguageDropdown(!showLanguageDropdown)}
        >
          <Globe size={20} />
        </button>

        {showLanguageDropdown && (
          <div className="language-dropdown">
            <button onClick={() => changeLanguage("en")}>EN</button>
            <button onClick={() => changeLanguage("az")}>AZ</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingButtons;
