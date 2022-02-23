import axios from "axios";
import { useState } from "react";
import "./newProduct.css";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const [img1Input, setImg1] = useState("");
  const [img2Input, setImg2] = useState("");
  const [img3Input, setImg3] = useState("");
  const [inputs, setInputs] = useState({});
  // const [file, setFile] = useState(null);
  // const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name: inputs.name,
      description: inputs.description,
      amount: inputs.amount,
      category: inputs.category,
      price: inputs.price,
      images: [img1Input, img2Input, img3Input],
    };

    addProduct(newProduct, dispatch);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Image</label>
          <div className="row px-3 gap-1">
            <input
              type="text"
              className=""
              onChange={(e) => setImg1(e.target.value)}
            />
            <input type="text" onChange={(e) => setImg2(e.target.value)} />
            <input type="text" onChange={(e) => setImg3(e.target.value)} />
          </div>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="name"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <textarea
            name="description"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Category</label>
          <input
            name="category"
            type="text"
            placeholder="Hp"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Quantity</label>
          <input
            type="number"
            name="amount"
            placeholder="quantity in stock"
            onChange={handleChange}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="addProductButton col-4 rounded-0 my-2"
        >
          Create
        </button>
      </form>
    </div>
  );
}

const Input = ({ handleChange, name }) => (
  <input
    name={name}
    type="text"
    placeholder="enter image url..."
    onChange={handleChange}
  />
);
