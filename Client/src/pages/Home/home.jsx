import PropTypes from "prop-types";
import Loading from "../../components/loading";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Typography, Input } from "antd";
import { ShoppingCartOutlined, GiftOutlined } from "@ant-design/icons";
import { Carousel, Image } from "antd";
import ProductCard from "../../components/productCard/productCard";
import { useDispatch, useSelector } from "react-redux";
import { productApi } from "../../api/productApi";
import { productSlice } from "../../redux/productSlice";
import { useNavigate } from "react-router-dom";
import carousel1 from '../../assets/image/carousel1.jpg';
import carousel2 from '../../assets/image/carousel2.jpg';
import carousel3 from '../../assets/image/carousel3.jpg';
import trio1 from '../../assets/image/trio1.jpg';
import trio2 from '../../assets/image/trio2.jpg';
import trio3 from '../../assets/image/trio3.jpg';
import trip1 from '../../assets/image/trip1.jpg';
import trip2 from '../../assets/image/trip2.jpg';
import trip3 from '../../assets/image/trip3.jpg';
import horizon1 from '../../assets/image/horizon1.jpg';

const { Title, Text } = Typography;
const { Search } = Input;

Home.propTypes = {};
const carouselItems = [
  <div key="1">
    <img
      src={carousel1}
      alt="Slide 1"
      style={{ width: "100%",  borderRadius: "8px", width: '692px', height: '423px' }}
    />
  </div>,
  <div key="2">
    <img
      src={carousel2}
      alt="Slide 2"
      style={{ width: "100%",  borderRadius: "8px", width: '692px', height: '423px' }}
    />
  </div>,
  <div key="3">
    <img
      src={carousel3}
      alt="Slide 3"
      style={{ width: "100%",  borderRadius: "8px", width: '692px', height: '423px' }}
    />
  </div>,
];

function Home(props) {
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getAllProducts = async () => {
    try {
      const response = await productApi.getAllProducts();
      const res = await productApi.getAllProducts({order: 'desc', limit: 12});
      setProducts(res.data.data);
      dispatch(productSlice.actions.setProductList(response.data.data))
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getAllProducts();
  }, [])
  return (
    <div style={{backgroundColor: '#e5e7eb',}}>
      <div className="home-sub-container">
        <Row
          gutter={[16, 16]}
          style={{ margin: "auto" }}
        >
          <Col span={17}>
            <Carousel autoplay style={{ width: "692px", height: "423px" }}>
              {carouselItems.map((item) => item)}
            </Carousel>
          </Col>
          <Col span={7}>
            <Row gutter={[4, 4]}>
              <Col span={24}>
                <img
                  src={trio1}
                  alt="Image 4"
                  style={{ borderRadius: '8px', padding: '0px', width: '272px', height: '136px' }}
                />
              </Col>
              <Col span={24}>
                <img
                  src={trio2}
                  alt="Image 5"
                  style={{ borderRadius: '8px', padding: '0px', width: '272px', height: '136px' }}
                />
              </Col>
              <Col span={24}>
                <img
                  src={trio3}
                  alt="Image 6"
                  style={{ borderRadius: '8px', padding: '0px', width: '272px', height: '136px' }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div style={{ padding: "20px 0px", width:'986px', margin:'auto' }}>
       <Row gutter={[16, 16]}>
         <Col span={6}>
           <Card style={{ textAlign: "center", borderRadius: "8px"}} className="home-card">
             <ShoppingCartOutlined style={{ fontSize: "32px" }} />
             <Title level={4}>Free Delivery</Title>
             <Text>Worldwide from $27</Text>
           </Card>
         </Col>
         <Col span={6}>
           <Card style={{ textAlign: "center", borderRadius: "8px"}} className="home-card">
             <GiftOutlined style={{ fontSize: "32px" }} />
             <Title level={4}>Warranty</Title>
             <Text>Up to 2 years</Text>
           </Card>
         </Col>
         <Col span={6}>
           <Card style={{ textAlign: "center", borderRadius: "8px"}} className="home-card">
             <GiftOutlined style={{ fontSize: "32px" }} />
             <Title level={4}>Easy Return</Title>
             <Text>365 days return</Text>
           </Card>
         </Col>
         <Col span={6}>
           <Card style={{ textAlign: "center", borderRadius: "8px"}} className="home-card">
             <GiftOutlined style={{ fontSize: "32px" }} />
             <Title level={4}>Wide Choice</Title>
             <Text>100k items available</Text>
           </Card>
         </Col>
       </Row>
      </div>
      <div style={{marginTop: '8px', width:'986px', margin:'auto'}}>
        <img
          src={horizon1}
          alt="Image"
          style={{ borderRadius: '8px', padding: '0px', width: '986px', height: '136px' }}
        />
      </div>
      <div className="home-sub-container">
        {/* <h1>Popular Products</h1> */}
        <Title level={2}>Newest Products</Title>
        <Row gutter={[8, 8]}>
          {products.map((product, index) => (
            <Col key={index} span={6}>

              <ProductCard product={product}/>
              </Col>
          ))}
        </Row>
      </div>
      <div className="home-sub-container">
        <div className="home-more-btn" onClick={() => navigate('/products')}>
          <a >More {'>'}</a>
        </div>
      </div>
      <div className="home-sub-container" style={{paddingBottom:'16px'}}>
        <Title level={2}>New Arrivals</Title>
        <img
          src={trip1}
          alt="Image"
          style={{ borderRadius: '8px', padding: '0px', marginBottom: '12px', width: '986px', height: '136px' }}
        />
        <Row gutter={[16, 16]}>
         <Col span={12}>
            <img
              src={trip2}
              alt="Image"
              style={{ borderRadius: '8px', padding: '0px', width: '485px', height: '136px' }}
            />
         </Col>
         <Col span={12}>
            <img
              src={trip3}
              alt="Image"
              style={{ borderRadius: '8px', padding: '0px', width: '485px', height: '136px' }}
            />
         </Col>
       </Row>
      </div>
    </div>
  );
}

export default Home;
