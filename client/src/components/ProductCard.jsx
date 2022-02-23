import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = (product) => {
  const { src, price, name, id, description } = product;
  const cart = useSelector((state) => state.cart);

  const productExists = (id) => {
    return cart.products.some(function (el) {
      return el.id === id;
    });
  };

  const handleClick = () => {
    if (!productExists(product.id)) {
      dispatch(addProduct({ ...product, quantity: 1 }));
    } else {
      return;
    }
  };
  const dispatch = useDispatch();
  return (
    <div className="product-card">
      <div className="product-tumb">
        <img src={src} alt="laptop" />
      </div>
      <div className="product-details">
        <h5>
          <Link to={`/product/${id}`}>{name}</Link>
        </h5>
        <p>
          {description.length > 36
            ? `${description.slice(0, 36)}...`
            : description}
        </p>
        <div className="product-price"> kshs{price}</div>
        <div className="product-bottom-details">
          <div className="product-links">
            <Link
              to={`/`}
              className="btn btn-outline-dark"
              onClick={handleClick}
            >
              Add to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
