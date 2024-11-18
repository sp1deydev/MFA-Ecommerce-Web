import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';
import { vietnamCurrency } from '../../helpers/currency';
import { GiftOutlined, PlusOutlined, ShoppingOutlined, FileProtectOutlined, InfoCircleOutlined, ShopOutlined } from '@ant-design/icons';
import { Button, Row, Col } from 'antd';
import ProductCard from '../../components/productCard/productCard';

const { Title } = Typography;

ProductDetails.propTypes = {
    
};

function ProductDetails(props) {
    const {productId} = useParams()
    const products = useSelector(state => state.product.productList)
    const product =  products.find(product => product._id == productId); //use find() instead of filter() beacause I just want product object not a array
    const [recommendProducts, setRecommendProducts] = useState([]);
    useEffect(()=> {
        let arr = products.filter(product => product.id != productId)
        arr = arr.sort(() => 0.5 - Math.random());
        arr = arr.slice(0, 4);
        setRecommendProducts(arr);
    }, [product])
    return (
        <div className='product-detail-container'>
            <div className='product-detail-sub-container'>
                <img alt={product.name} src={product.image} className='product-detail-image'/>
                <div className='product-detail-basic-infor'> 
                    <Title level={3} style={{height: "64px"}}>{product.name}</Title>
                    <div className='product-detail-price'>{vietnamCurrency(product.price)}</div>
                    <div className='product-detail-infor-box'>
                        <div className='product-detail-promotion-header'> <GiftOutlined /> Promotion</div>
                        <div className='product-detail-promotion-content'>Shop your favorite items and enjoy 25% off on your entire purchase! Whether you're looking for the latest trends or timeless classics, now is the perfect time to refresh your wardrobe or stock up on essentials.</div>
                    </div>
                    <div className='product-detail-btn-group'>
                        <Button type="" icon={<PlusOutlined />} style={{ height: "48px", width: "100%", fontSize: '16px'}}>
                            Add To Cart
                        </Button>
                        <Button type="primary" icon={<ShoppingOutlined />} style={{backgroundColor: '#0066CC', height: "48px", width: "100%", fontSize: '16px'}}>
                            Buy Now
                        </Button>
                    </div>
                </div>
                <div className='product-detail-policy'>
                    <div className='product-detail-infor-box'>
                        <div className='product-detail-policy-header'> <FileProtectOutlined /> Purchase Policy</div>
                        <div className='product-detail-policy-content'>
                            <Title level={5}>1. Order Cancellation</Title>
                            <p>Orders may be canceled within 24 hours of purchase. After this time, the order cannot be canceled, but you may return the item upon receipt.</p>
                            
                            <Title level={5}>2. Product Warranty</Title>
                            <p>Some products may come with manufacturer warranties. Please refer to the product details or contact customer service for warranty information.</p>
                            <Title level={5}>3. Customer Support</Title>
                            <p>For any questions or issues with your order, our customer support team is available 24/7 via email at email@example.com or phone at 19002412xxx</p>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className='product-detail-description'>
                <Title level={4}><InfoCircleOutlined /> Description</Title>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ab fuga reprehenderit, porro obcaecati culpa beatae odit architecto tenetur ipsum mollitia explicabo tempora temporibus blanditiis aperiam pariatur dolores repudiandae autem?
                {product.description}
            </div>
            <Title level={3}><ShopOutlined /> Recommend For You</Title>
            <Row gutter={[8, 8]}>
                {recommendProducts.map((product, index) => (
                  <Col key={index} span={6}>
                    
                    <ProductCard product={product}/>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default ProductDetails;