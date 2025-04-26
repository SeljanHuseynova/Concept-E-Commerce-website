import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { addToCart } from "../../redux/accountSlice";
import { WishListContext } from "../../context/WishListProviderNew";
import { CiHeart } from "react-icons/ci";
import { FaEye, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import paypal from '../../assets/images/general/paypal.svg';
import Swal from "sweetalert2";

const SingleProduct = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.users?.currentUser);
  const { toggleWishlist, wishlist } = useContext(WishListContext);
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.filteredProducts.find((p) => p.id === Number(id))
  );
  const info = [
    { text: "95% of this item's reviews are positive.", emoji: "⭐" },
    { text: "Add this item and get it soon!", emoji: "💖" },
    { text: "112 customers are viewing this product.", emoji: <FaEye /> },
  ];
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0);
  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInfoIndex((prevIndex) => (prevIndex + 1) % info.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = (product) => {
    if (!currentUser) {
      toast.error("Please log in to add items to the cart.");
      return;
    }
    dispatch(addToCart({ userId: currentUser.id, product }));
   
  };
  const handlePay = (product) => {
    if (!currentUser) {
      toast.error("Please log in to add items to the cart.");
      return;
    }
    if (product.quantity === 0) {
      Swal.fire({
               icon: "warning",
               title: "Out of Stock",
               text: `"${product.name}" cannot be added, not enough stock!`,
             });
      return;
  }
      navigate("/check-out");
  
  }
  const isInWishlist = wishlist.some((item) => item.id === product.id);
  return (
    <div className="single-product">
      <div className="title-product">
        <Link className="home" to="/">Home</Link>
        <span>/</span>
        <p>{product.name}</p>
      </div>
      <div className="details">
        <div className="images">
          {product?.images?.map((image, index) => (
            <div
              key={index}
              className={`image ${selectedImage === image ? "selected" : ""}`}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>

        <div className="main-image">
          {selectedImage ? (
            <img src={selectedImage} alt="main-product-image" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>

        <div className="content-container">
          <div className="content">
            <span className="brand">{product.brand}</span>
            <h2 className="name">{product.name}</h2>
            <div className="rate-part">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={index < product.rate ? "star filled" : "star"}
                >
                  ★
                </span>
              ))}
              {product.rate === 0 && (
                <span className="no-review">No review</span>
              )}
            </div>
            <span className="price">${product.price}</span>
            <p className="description">{product.description}...</p>
            <div className="infos">
              <p className="info-text">
                {info[currentInfoIndex].emoji} {info[currentInfoIndex].text}
              </p>
            </div>
            <div className="bottom">
              <button
                className="add-to-cart"
                onClick={() => handleAddToCart(product)}
              >
                {product.quantity === 0 ? "OUT OF STOCK" : "ADD TO CART"}
              </button>

              <button
                className={`wishlist-btn ${isInWishlist ? "in-wishlist" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(product);
                }}
              >
                {isInWishlist ? (
                  <FaHeart className="icon" />
                ) : (
                  <CiHeart className="icon" />
                )}
              </button>
            </div>
            <button className="paypal" onClick={() => handlePay(product)}>Pay with <img src={paypal} alt="paypal" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
