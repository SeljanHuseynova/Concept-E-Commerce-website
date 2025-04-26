import React, { useState, useEffect, useContext, useRef } from "react";
import { Moon, Sun, Globe } from "lucide-react";
import { LanguageContext } from "../../context/LanguageProvider";

const FloatingButtons = ({ onThemeChange }) => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const { changeLanguage } = useContext(LanguageContext);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setDarkMode(savedTheme === "dark");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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

      <div className="language-container" ref={dropdownRef}>
        <button
          className="language-toggle"
          onClick={(e) => {
            e.stopPropagation();
            setShowLanguageDropdown((prev) => !prev);
          }}
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
