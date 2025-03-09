import React, { useState, useEffect } from "react";
import { Moon, Sun, Globe } from "lucide-react";

const FloatingButtons = ({ onThemeChange, onLanguageChange }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  useEffect(() => {
    // Sayt açılarkən seçilmiş temanı tətbiq et
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
    onThemeChange(darkMode ? "dark" : "light");
  }, [darkMode, onThemeChange]);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    onThemeChange(newTheme);
  };

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  return (
    <div className="floating-buttons">
      {/* Dark/Light Mode Button */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Language Switcher Button */}
      <div className="language-container">
        <button className="language-toggle" onClick={toggleLanguageDropdown}>
          <Globe size={20} />
        </button>

        {/* Dropdown for Language Selection (Opens to the Left) */}
        {showLanguageDropdown && (
          <div className="language-dropdown">
            <button onClick={() => onLanguageChange("en")}>EN</button>
            <button onClick={() => onLanguageChange("az")}>AZ</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingButtons;
