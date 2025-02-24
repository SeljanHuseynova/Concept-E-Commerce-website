import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Announcement from "./Announcement";

const Header = ({currentUser}) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 992);
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 992);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <header>
      <Announcement />
      <Navbar currentUser={currentUser} isSticky={isSticky} isMobileView={isMobileView}/>
    </header>
  );
};

export default Header;
