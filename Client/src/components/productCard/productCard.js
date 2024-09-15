import React from "react";
import { Card, Col, Button, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { vietnamCurrency } from "../../helpers/currency";

const { Text, Title } = Typography;
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const onViewProductDetail = () => {
    navigate(`/products/${product.id}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  };
  return (
    <Card hoverable className="product-card" onClick={() => onViewProductDetail()}>
      <img
        alt={product.name}
        src={product.image}
        className="product-card-image"
      />
      <Title level={4} className="product-card-price">
        {vietnamCurrency(product.price)}
      </Title>
      <p className="product-card-name">{product.name}</p>
    </Card>
  );
};

export default ProductCard;
