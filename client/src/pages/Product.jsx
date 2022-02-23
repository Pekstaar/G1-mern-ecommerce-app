import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

// // const Desc = styled.p`
//   margin: 20px 0px;
// `;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

// const FilterContainer = styled.div`
//   width: 50%;
//   margin: 30px 0px;
//   display: flex;
//   justify-content: space-between;
//   ${mobile({ width: "100%" })}
// `;

// const Filter = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const FilterTitle = styled.span`
//   font-size: 20px;
//   font-weight: 200;
// `;

// const FilterColor = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   background-color: ${(props) => props.color};
//   margin: 0px 5px;
//   cursor: pointer;
// `;

// const FilterSize = styled.select`
//   margin-left: 10px;
//   padding: 5px;
// `;

// const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const cart = useSelector((state) => state.cart);

  console.log(cart);

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  const dispatch = useDispatch();

  const setImage = (i) => {
    setCurrentImage(i);
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };
  const productExists = (id) => {
    return cart.products.some(function (el) {
      return el._id === id;
    });
  };
  const handleClick = () => {
    if (!productExists(product.id)) {
      dispatch(addProduct({ ...product, quantity }));
    } else {
      return;
    }
    // console.log(productExists(product.id));
  };
  return (
    <Container>
      <Navbar />
      <Wrapper className=" mx-auto bg-light">
        <ImgContainer>
          <Image src={product.images && product.images[currentImage]} />
        </ImgContainer>

        <InfoContainer>
          <Title>{product.name}</Title>
          {/* description */}
          <div style={{ minHeight: "150px" }}>{product.description}</div>
          <Price>Kshs {product.price}</Price>

          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <div className=" container mx-auto d-flex gap-2">
        {product.images &&
          product.images.map((i, _index) => (
            <img
              alt="/laptop"
              key={_index}
              src={i}
              height="80px"
              width="100px"
              style={{ objectFit: "contain", cursor: "pointer" }}
              className="border p-1"
              onClick={() => setImage(_index)}
            />
          ))}

        {/* <img
          alt="/laptop"
          height="60px"
          src={product.images && product.images[]}
        /> */}
      </div>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
