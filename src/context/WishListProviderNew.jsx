import React, { createContext, useState, useEffect } from "react";
export const WishListContext = createContext();
export const WishListProviderNew = ({ children }) => {
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
  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem("wishlist");
  };
  return (
    <WishListContext.Provider
      value={{ wishlist, toggleWishlist, clearWishlist }}
    >
      {children}
    </WishListContext.Provider>
  );
};
