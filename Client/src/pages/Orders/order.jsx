import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, message, Row, Col, Popconfirm, Select, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { vietnamCurrency } from '../../helpers/currency';
import { orderApi } from '../../api/orderApi';
import { useSelector } from 'react-redux';

const { Option } = Select;

const statusColors = {
  pending: 'orange',
  completed: 'green',
  cancelled: 'red',
  delivered: 'blue',
};
const paymentMethodColors = {
  cod: 'purple',
  paypal: 'cyan',
};

const PurchaseOrder = () => {
  const [data, setData] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser)

  const getAllOrders = async () => {
    try {
      const response = await orderApi.getOrderByUserId({id:currentUser.id});
      setData(response.data.data);
    } catch (err) {}
  };

  useEffect(() => {
    getAllOrders();
  }, []);


  const columns = [
    { title: 'ID', dataIndex: '_id', key: '_id' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'City', dataIndex: 'cityName', key: 'cityName' },
    { title: 'District', dataIndex: 'districtName', key: 'districtName' },
    { title: 'Ward', dataIndex: 'wardName', key: 'wardName' },
    { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice', 
        render: (totalPrice) => (
            <Tag color={'#3C3D37'}>{vietnamCurrency(totalPrice)}</Tag>
          ),
     },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (paymentMethod) => (
        <Tag color={paymentMethodColors[paymentMethod]}>{paymentMethod}</Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusColors[status]}>{status}</Tag>
      ),
    },
  ];

  return (
      <div className="home-sub-container">
      <Row justify="start" style={{ marginBottom: 16 }}>
        <Col>
          <Input.Search
            placeholder="Search by address, city, district, or ward"
            enterButton
            onChange={(e) => console.log(e.target.value)} // Simple search handler
            style={{ width: 360 }}
          />
        </Col>
      </Row>

      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="_id" 
        pagination={{
          position: ["bottomCenter"], // Center the pagination
        }}/>

      </div>
  );
};

export default PurchaseOrder;
