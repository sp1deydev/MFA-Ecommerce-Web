import { useState, useEffect, Fragment } from "react";
import { Form, Input, Select, Button, Radio, Card, Row, Col, Typography, Divider, message } from "antd";
import axios from "axios";
import { cartApi } from "../../api/cartApi";
import { vietnamCurrency } from "../../helpers/currency";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const CheckOut = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState();
  const [cityOptions, setCityOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const [loading, setLoading] = useState(false);

  const cart = {
    totalPrice: 557.99,
    discount: 0,
  };

  const countTotalPrice = (products) => {
    const total = products.reduce((total, item) => {
      return total + (item.price*item.quantity);
    }, 0)
    return total;
  }
  const getCartItems = async () => {
    try {
      const cartData = await cartApi.getCartData();
      setCartItems(cartData.data.data.products);
      setCartId(cartData.data.data._id);
    }
    catch (err) {

    }
  }
  useEffect(() => {
    getCartItems();
  }, [])

  useEffect(() => {
    const getCities = async () => {
      try {
        const res = await axios.get("https://vapi.vnappmob.com/api/province/");
        const cities = res.data.results;
        setCityOptions(cities.map((city) => ({ value: city.province_id, label: city.province_name })));
      } catch (error) {
        message.error("Failed to load cities. Please try again.");
      }
    };
    getCities();
  }, []);

  const getDistricts = async (cityId) => {
    try {
      const res = await axios.get(`https://vapi.vnappmob.com/api/province/district/${cityId}`);
      const districts = res.data.results;
      setDistrictOptions(districts.map((district) => ({ value: district.district_id, label: district.district_name })));
    } catch (error) {
      message.error("Failed to load districts. Please try again.");
    }
  };

  const getWards = async (districtId) => {
    try {
      const res = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`);
      const wards = res.data.results;
      setWardOptions(wards.map((ward) => ({ value: ward.ward_id, label: ward.ward_name })));
    } catch (error) {
      message.error("Failed to load wards. Please try again.");
    }
  };

  const handleOrderSubmit = (values) => {
    setLoading(true);

    // Extract selected city, district, and ward names
    const cityName = selectedCity?.label || "N/A";
    const districtName = selectedDistrict?.label || "N/A";
    const wardName = selectedWard?.label || "N/A";

    const submissionData = {
        address: values.address,
        paymentMethod: values.paymentMethod,
        status: 'pending',
        cityName,
        districtName,
        wardName,
        totalPrice: countTotalPrice(cartItems),
        products: cartItems,
    };

    setTimeout(() => {
      console.log("Order submitted with values:", submissionData);
      message.success("Order placed successfully!");
      setLoading(false);
    }, 2000);
  };

  return (
    <Fragment>
      <Row gutter={24} style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Left Column */}
        <Col xs={24} lg={16}>
          <Card bordered={false} style={{ marginBottom: "24px" }}>
            <Button type="link" style={{ marginBottom: "12px" }} onClick={() => navigate(-1)}>← Back</Button>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleOrderSubmit}
              initialValues={{ paymentMethod: "cod" }}
            >
              <Title level={4} style={{ marginBottom: "16px" }}>
                Shipping Address
              </Title>
              <Form.Item
                name="address"
                rules={[{ required: true, message: "Please enter your shipping address." }]}
              >
                <Input.TextArea placeholder="Enter your shipping address" rows={2} />
              </Form.Item>
              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: "Please select your city." }]}
              >
                <Select
                  placeholder="Select a city"
                  options={cityOptions}
                  onChange={(value, option) => {
                    setSelectedCity(option);
                    setDistrictOptions([]);
                    setWardOptions([]);
                    form.resetFields(["district", "ward"]);
                    getDistricts(value);
                  }}
                />
              </Form.Item>
              <Form.Item
                name="district"
                label="District"
                rules={[{ required: true, message: "Please select your district." }]}
              >
                <Select
                  placeholder="Select a district"
                  options={districtOptions}
                  onChange={(value, option) => {
                    setSelectedDistrict(option);
                    setWardOptions([]);
                    form.resetFields(["ward"]);
                    getWards(value);
                  }}
                />
              </Form.Item>
              <Form.Item
                name="ward"
                label="Ward"
                rules={[{ required: true, message: "Please select your ward." }]}
              >
                <Select
                  placeholder="Select a ward"
                  options={wardOptions}
                  onChange={(value, option) => setSelectedWard(option)}
                />
              </Form.Item>

              <Divider />

              <Title level={4} style={{ marginBottom: "12px" }}>
                Payment Information
              </Title>
              <Form.Item
                name="paymentMethod"
                label="Payment Method"
                rules={[{ required: true, message: "Please select a payment method." }]}
              >
                <Radio.Group>
                  <Radio value="cod">COD</Radio>
                  <Radio value="paypal">PayPal</Radio>
                </Radio.Group>
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", marginTop: "16px" }}
                loading={loading}
              >
                Confirm Payment {vietnamCurrency(countTotalPrice(cartItems))}
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Right Column */}
        <Col xs={24} lg={8}>
          <Card bordered={false}>
            <Title level={4}>Order Summary</Title>
            {cartItems?.map((product) => (
              <Row key={product._id} justify="space-between" style={{ marginBottom: "8px" }}>
                <Col span={12}>
                  <Text>{product.name}</Text>
                </Col>
                <Col>
                  <Text>{vietnamCurrency(product.price)} x {product.quantity}</Text>
                </Col>
              </Row>
            ))}
            <Divider />
            <Row justify="space-between">
              <Text>Delivery</Text>
              <Text>{vietnamCurrency(0)}</Text>
            </Row>
            <Row justify="space-between">
              <Text>Tax</Text>
              <Text>{vietnamCurrency(0)}</Text>
            </Row>
            <Divider />
            <Row justify="space-between" style={{ fontWeight: "bold" }}>
              <Text>Total</Text>
              <Text>{vietnamCurrency(countTotalPrice(cartItems))}</Text>
            </Row>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CheckOut;
