import React from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Space,
  message,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Title, Text } = Typography;

const ContactUs = () => {
  // Handle form submission
  const onFinish = (values) => {
    console.log("Received values: ", values);
    message.success("Your message has been sent successfully!");
  };

  return (
    <div style={{marginBottom:'80px'}}>
      <Row justify="center" style={{ padding: "50px 0" }}>
        <Col xs={22} sm={18} md={14} lg={10}>
          <Card
            bordered={false}
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          >
            <Title
              level={2}
              style={{ textAlign: "center", marginBottom: "20px" }}
            >
              Contact Us
            </Title>
            <Text
              type="secondary"
              style={{
                display: "block",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Feel free to reach out to us with any questions or feedback.
            </Text>

            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="name"
                label="Your Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                name="subject"
                label="Subject"
                rules={[{ required: true, message: "Please enter a subject" }]}
              >
                <Input placeholder="Subject" />
              </Form.Item>

              <Form.Item
                name="message"
                label="Message"
                rules={[
                  { required: true, message: "Please enter your message" },
                ]}
              >
                <TextArea rows={4} placeholder="Write your message here" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>

          <Space
            direction="vertical"
            style={{ marginTop: "30px", textAlign: "center", width: "100%" }}
          >
            <Title level={4}>Our Contact Details</Title>
            <Space direction="horizontal">
              <EnvironmentOutlined />
              <Text>1234 Ant Street, City, Country</Text>
            </Space>
            <Space direction="horizontal">
              <PhoneOutlined />
              <Text>(123) 456-7890</Text>
            </Space>
            <Space direction="horizontal">
              <MailOutlined />
              <Text>support@example.com</Text>
            </Space>
          </Space>
        </Col>
      </Row>
      <div className="mapswrapper">
        <iframe
          width="100%"
          height="450"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=H%E1%BB%8Dc%20vi%E1%BB%87n%20k%E1%BB%B9%20thu%E1%BA%ADt%20m%E1%BA%ADt%20m%C3%A3&zoom=12&maptype=roadmap"
        ></iframe>
        <a href="https://www.fluxpromptgenerator.net">Prompt Generator</a>
        <style>{`
    .mapswrapper {
      background: #fff;
      position: relative;
      display: flex;
      justify-content: center;
    }
    .mapswrapper iframe {
      border: 0;
      position: relative;
      z-index: 2;
    }
    .mapswrapper a {
      color: rgba(0, 0, 0, 0);
      position: absolute;
      left: 0;
      top: 0;
      z-index: 0;
    }
  `}</style>
      </div>
    </div>
  );
};

export default ContactUs;
