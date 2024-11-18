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

const { Title, Text } = Typography;
const { Search } = Input;

Home.propTypes = {};
const carouselItems = [
  <div key="1">
    <img
      // src="https://placehold.co/692x423"
      src="https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/plp/phones-20230509/nova-series/img-0314/nova-series-1.jpg"
      alt="Slide 1"
      style={{ width: "100%",  borderRadius: "8px", width: '692px', height: '423px' }}
    />
  </div>,
  <div key="2">
    <img
      // src="https://placehold.co/692x423"
      src="https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/plp/phones-20230509/mate-series/mate-series-card-1.jpg"
      alt="Slide 2"
      style={{ width: "100%",  borderRadius: "8px", width: '692px', height: '423px' }}
    />
  </div>,
  <div key="3">
    <img
      src="https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/plp-x/laptops/matebook-series/matebook-14-2024-card-1.jpg"
      alt="Slide 3"
      style={{ width: "100%",  borderRadius: "8px", width: '692px', height: '423px' }}
    />
  </div>,
];

function Home(props) {
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()
  // const products = useSelector((state)=>state.product.productList) || []
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
                  src="https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/plp-x/laptops/matebook-series/matebook-14-2024-card-4.jpg"
                  alt="Image 4"
                  style={{ borderRadius: '8px', padding: '0px', width: '272px', height: '136px' }}
                />
              </Col>
              <Col span={24}>
                <img
                  src="https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/plp/audio-new/freebuds-pro-3-card-3.jpg"
                  alt="Image 5"
                  style={{ borderRadius: '8px', padding: '0px', width: '272px', height: '136px' }}
                />
              </Col>
              <Col span={24}>
                <img
                  src="https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/plp-x/wearable/autumn-2024-wearable-launch/watch-ultimate-series/watch-ultimate-card-3.jpg"
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
          // src="https://placehold.co/986x136"
          src="https://i02.appmifile.com/202_operator_global/28/08/2024/bd585f8f64bb75569136e0b90e4e8cda.jpg?thumb=1&w=2560&f=webp&q=85"
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
        <div className="home-more-btn" onClick={()=>alert('click')}>
          <a >More {'>'}</a>
        </div>
      </div>
      <div className="home-sub-container" style={{paddingBottom:'16px'}}>
        <Title level={2}>New Arrivals</Title>
        <img
          src="https://i02.appmifile.com/837_operator_global/27/09/2024/d867a3b42393c00cab1f9ef8b63c5cbc.jpg?thumb=1&w=2560&f=webp&q=85"
          alt="Image"
          style={{ borderRadius: '8px', padding: '0px', marginBottom: '12px', width: '986px', height: '136px' }}
        />
        <Row gutter={[16, 16]}>
         <Col span={12}>
            <img
              src="https://i02.appmifile.com/701_operator_global/21/08/2024/02faef4dce1c8e7cb86f77f457f164c3.jpg?thumb=1&w=660&f=webp&q=85"
              alt="Image"
              style={{ borderRadius: '8px', padding: '0px', width: '485px', height: '136px' }}
            />
         </Col>
         <Col span={12}>
            <img
              src="https://i02.appmifile.com/979_operator_global/21/08/2024/1c273703a8605ff2bd08b6ef3660f9c8.jpg?thumb=1&w=660&f=webp&q=85"
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
