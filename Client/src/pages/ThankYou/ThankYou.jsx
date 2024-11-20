import React from "react";
import { Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Result
      status="success"
      title="Thank You for Your Purchase!"
      subTitle="Your order has been successfully placed. We'll notify you once your items are shipped."
      icon={<SmileOutlined />}
      extra={[
        <Button type="primary" key="home" onClick={handleBackToHome}>
          Back to Home
        </Button>,
        <Button key="orders" onClick={()=>navigate('/purchase-order')}>View My Orders</Button>,
      ]}
    />
  );
};

export default ThankYou;
