import React, { createContext, useState, useEffect } from "react";
export const WishListContext = createContext();
export const WishListProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  const toggleWishlist = (item) => {
    setWishlist((prevWishlist) => {
      const itemExists = prevWishlist.some(
        (wishlistItem) => wishlistItem.id === item.id
      );
      if (itemExists) {
        return prevWishlist.filter(
          (wishlistItem) => wishlistItem.id !== item.id
        );
      } else {
        return [...prevWishlist, item];
      }
    });
  };
  return (
    <WishListContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishListContext.Provider>
  );
};
