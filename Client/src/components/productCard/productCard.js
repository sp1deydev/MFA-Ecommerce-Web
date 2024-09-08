import React from 'react';
import { Card, Col, Button, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;
const { Meta } = Card;

const ProductCard = ({ product }) => {
  return (
    <Col span={6}>
             

           <Card
                hoverable
                className="home-card"
            >
                <img alt="example" src="https://cdn2.fptshop.com.vn/unsafe/150x0/filters:quality(100)/iphone_13_dd_1_bc41842769.jpg" className='product-card-image'/>
                <Title level={4} className='product-card-price'>8.170.000đ</Title>
                <p className='product-card-name'>Smart Tivi Samsung Crystal UHD 4K 55 inch UA55AU7002</p>
            </Card>
         </Col>
  );
};

export default ProductCard;
