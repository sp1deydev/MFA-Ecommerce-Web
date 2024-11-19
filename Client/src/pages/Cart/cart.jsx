import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { List, Card, Row, Col, InputNumber, Button, Space, Input } from "antd";
import { DeleteOutlined, ShoppingOutlined } from "@ant-design/icons";
import { cartApi } from '../../api/cartApi';
import { vietnamCurrency } from '../../helpers/currency';
import { toast } from 'react-toastify';

const items = [
  {
    id: 1,
    name: "T Shirt ",
    description: "Cotton Shirt Test",
    price: 44.0,
    quantity: 1,
    img: "https://shopdunk.com/images/thumbs/0000569_alpine-green.webp",
  },
  {
    id: 2,
    name: "Smart Tivi Samsung Crystal UHD 4K 55 inch UA55AU7002 2 ",
    description: "Cotton Shirt Test",
    price: 44.0,
    quantity: 1,
    img: "https://shopdunk.com/images/thumbs/0000569_alpine-green.webp",
  },
  {
    id: 3,
    name: "Smart Tivi Samsung Crystal UHD 4K 55 inch UA55AU7002 2 ",
    description: "Cotton Shirt Test",
    price: 44.0,
    quantity: 1,
    img: "https://shopdunk.com/images/thumbs/0000569_alpine-green.webp",
  },
  {
    id: 3,
    name: "Smart Tivi Samsung Crystal UHD 4K 55 inch UA55AU7002 2 ",
    description: "Cotton Shirt Test",
    price: 44.0,
    quantity: 1,
    img: "https://shopdunk.com/images/thumbs/0000569_alpine-green.webp",
  },
  {
    id: 3,
    name: "Smart Tivi Samsung Crystal UHD 4K 55 inch UA55AU7002 2 ",
    description: "Cotton Shirt Test",
    price: 44.0,
    quantity: 1,
    img: "https://shopdunk.com/images/thumbs/0000569_alpine-green.webp",
  },
  {
    id: 3,
    name: "Smart Tivi Samsung Crystal UHD 4K 55 inch UA55AU7002 2 ",
    description: "Cotton Shirt Test",
    price: 44.0,
    quantity: 1,
    img: "https://shopdunk.com/images/thumbs/0000569_alpine-green.webp",
  },
  {
    id: 3,
    name: "Smart Tivi Samsung Crystal UHD 4K 55 inch UA55AU7002 2 ",
    description: "Cotton Shirt Test",
    price: 44.0,
    quantity: 1,
    img: "https://shopdunk.com/images/thumbs/0000569_alpine-green.webp",
  },
  {
    id: 3,
    name: "Smart Tivi Samsung Crystal UHD 4K 55 inch UA55AU7002 2 ",
    description: "Cotton Shirt Test",
    price: 44.0,
    quantity: 1,
    img: "https://shopdunk.com/images/thumbs/0000569_alpine-green.webp",
  },
];

Cart.propTypes = {
    
};

function Cart(props) {
    const [cartItems, setCartItems] = useState(items);
    const [cartId, setCartId] = useState();
    const getCartItems = async () => {
      try {
        const cartData = await cartApi.getCartData();
        setCartItems(cartData.data.data.products);
        setCartId(cartData.data.data._id);
        console.log(cartData)
      }
      catch (err) {

      }
    }
    useEffect(() => {
      getCartItems();
    }, [])

  const updateQuantity = (id, value) => {
    const updatedItems = cartItems.map((item) =>
      item.productId === id ? { ...item, quantity: value } : item
    );
    setCartItems(updatedItems);
  };

  const removeItem = async (id) => {
    try {
      await cartApi.deleteProduct({ id: cartId, productId: id});
      getCartItems();
      toast.success('Delete product in cart successfully')
    }
    catch (err) {
      toast.success('Delete error')
    }
  };

  return (
    <>
    <h1 style={{padding:'40px 100px 20px'}}>Shopping Cart</h1>
    <div className="cart-container">
      <div className='cart-list'>
        <List
          dataSource={cartItems}
          renderItem={(item) => (
            <Card style={{ marginBottom: "10px" }}>
              <Row align="middle">
                <Col span={3}>
                  <img
                    src={`http://localhost:3001/${item.image}`}
                    alt={item.name}
                    style={{ width: "100%", maxWidth: "80px" }}
                  />
                </Col>
                <Col span={9}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </Col>
                <Col span={3}>
                  <h3>{vietnamCurrency(item.price)}</h3>
                </Col>
                <Col span={5}>
                  <Row>
                    <Button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </Button>
                    <InputNumber
                      min={1}
                      value={item.quantity}
                      onChange={(value) => updateQuantity(item.productId, value)}
                    />
                    <Button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </Row>
                </Col>
                <Col span={3}>
                  <h3>{vietnamCurrency(item.price*item.quantity)}</h3>
                </Col>
                <Col span={1}>
                  <Button
                    style={{color:'red'}}
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => removeItem(item.productId)}
                  />
                </Col>
              </Row>
            </Card>
          )}
        />
      </div>
      <div className="check-out-container">
        <div>
            <Space.Compact style={{ width: '100%' }}>
                <Input placeholder='Enter promo code'/>
                <Button type='primary' style={{backgroundColor:'#0066CC'}}>Submit</Button>
            </Space.Compact>
        </div>
        <div className='cart-check-out-info' style={{paddingTop:'20px'}}>
            <div className='cart-text'>
                Shipping cost
            </div>
            <div>
                TBD
            </div>
        </div>
        <div className='cart-check-out-info' style={{paddingTop:'20px'}}>
            <div className='cart-text'>
                Discount
            </div>
            <div>
                - 0
            </div>
        </div>
        <div className='cart-check-out-info' style={{padding:'20px 0px 20px 0px'}}>
            <div className='cart-text'>
                Tax
            </div>
            <div>
                TBD
            </div>
        </div>
        <hr/>
        <div className='cart-check-out-info' style={{paddingTop:'8px'}}>
            <div className='cart-bold-text'>
                Estimated Total
            </div>
            <div className='cart-bold-text'>
                TBD
            </div>
        </div>
        <div style={{textAlign: 'center', paddingTop:'40px'}}>
                <Button
                    size='large'
                    type='primary' 
                    style={{backgroundColor:'#0066CC'}}
                    icon={<ShoppingOutlined />}
                    onClick={()=>alert('checkout')}
                >Check Out</Button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Cart;