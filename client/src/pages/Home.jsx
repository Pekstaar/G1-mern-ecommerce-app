import axios from "axios";
import React, { useState } from "react";
// import Announcement from "../components/Announcement";
// import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import ProductCard from "../components/ProductCard";
// import Products from "../components/Products";
// import Slider from "../components/Slider";

const Home = () => {
  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    async function getProducts() {
      const products = await axios.get("http://localhost:5000/api/products");

      setProducts(products.data);
    }

    getProducts();
  }, []);
  return (
    <div>
      {/* <Announcement /> */}
      <Navbar />
      {/* <div className="col-lg-9 mx-auto"> */}
      <div className="container">
        <div className="row row-cols-2">
          {/* <div className="p-4 bg-primary "></div> */}
          {products.map((product, _index) => (
            <ProductCard
              className="col-md-4"
              src={product.images[0]} //0,1,2,3
              name={product.name}
              price={product.price}
              id={product._id}
              description={product.description}
              key={_index}
              images={product.images}
            />
          ))}
        </div>
        {/* </div> */}
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
