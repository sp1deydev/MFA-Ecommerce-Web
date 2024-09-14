import React from 'react';
import { Card, Col, Button, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const onViewProductDetail = () => {
    navigate(`/products/${product.id}`);
  }
  return (
    <Col span={6}>
             

           <Card
                hoverable
                className="home-card"
                onClick={()=>onViewProductDetail()}
            >
                <img alt={product.name} src={product.image} className='product-card-image'/>
                <Title level={4} className='product-card-price'>{product.price}</Title>
                <p className='product-card-name'>{product.name}</p>
            </Card>
         </Col>
  );
};

export default ProductCard;
