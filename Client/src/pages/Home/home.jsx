import PropTypes from "prop-types";
import Loading from "../../components/loading";
import React from "react";
import { Row, Col, Card, Button, Typography, Input } from "antd";
import { ShoppingCartOutlined, GiftOutlined } from "@ant-design/icons";
import { Carousel, Image } from "antd";
import ProductCard from "../../components/productCard/productCard";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;
const { Search } = Input;

Home.propTypes = {};
const carouselItems = [
  <div key="1">
    <img
      src="https://placehold.co/692x423"
      alt="Slide 1"
      style={{ width: "100%",  borderRadius: "8px" }}
    />
  </div>,
  <div key="2">
    <img
      src="https://placehold.co/692x423"
      alt="Slide 2"
      style={{ width: "100%",  borderRadius: "8px" }}
    />
  </div>,
  <div key="3">
    <img
      src="https://placehold.co/692x423"
      alt="Slide 3"
      style={{ width: "100%",  borderRadius: "8px" }}
    />
  </div>,
];
function Home(props) {
  const products = useSelector((state)=>state.product.productList) || []
  return (
    <div style={{backgroundColor: '#e5e7eb'}}>
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
                  src="https://placehold.co/272x136"
                  alt="Image 4"
                  style={{ borderRadius: '8px', padding: '0px' }}
                />
              </Col>
              <Col span={24}>
                <img
                  src="https://placehold.co/272x136"
                  alt="Image 5"
                  style={{ borderRadius: '8px', padding: '0px' }}
                />
              </Col>
              <Col span={24}>
                <img
                  src="https://placehold.co/272x136"
                  alt="Image 6"
                  style={{ borderRadius: '8px', padding: '0px' }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div style={{ padding: "20px", width:'986px', margin:'auto' }}>
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
          src="https://placehold.co/986x136"
          alt="Image"
          style={{ borderRadius: '8px', padding: '0px' }}
        />
      </div>
      <div className="home-sub-container">
        <h1>Danh sách sản phẩm</h1>
        <Row gutter={[8, 8]}>
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </Row>
      </div>
      <div className="home-sub-container">
        <div className="home-more-btn" onClick={()=>alert('click')}>
          <a >More {'>'}</a>
        </div>
      </div>
      <div className="home-sub-container" style={{paddingBottom:'16px'}}>
        <h1>Mùa tựu trường</h1>
        <img
          src="https://placehold.co/986x136"
          alt="Image"
          style={{ borderRadius: '8px', padding: '0px', marginBottom: '12px' }}
        />
        <Row gutter={[16, 16]}>
         <Col span={12}>
            <img
              src="https://placehold.co/485x136"
              alt="Image"
              style={{ borderRadius: '8px', padding: '0px' }}
            />
         </Col>
         <Col span={12}>
            <img
              src="https://placehold.co/485x136"
              alt="Image"
              style={{ borderRadius: '8px', padding: '0px' }}
            />
         </Col>
       </Row>
      </div>
    </div>
  );
}

export default Home;
