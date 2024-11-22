import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, message, Row, Col, Popconfirm, Select, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { vietnamCurrency } from '../../helpers/currency';
import { orderApi } from '../../api/orderApi';

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

const AdminPurchaseOrder = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  const getAllOrders = async () => {
    try {
      const response = await orderApi.getAllOrders({order:'desc'});
      setData(response.data.data);
    } catch (err) {}
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue({ ...record, totalPrice: vietnamCurrency(record.totalPrice) });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then(async (values) => {
      try {
        await orderApi.updateStatus({ status: values.status, id: editingRecord._id });
        getAllOrders();
        message.success('Status updated successfully!');
      } catch (err) {
        message.error('Status update failed!');
      }
      handleCancel();
    }).catch((info) => {
      console.error('Validation Failed:', info);
    });
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item._id !== id));
    message.success('Record deleted successfully!');
  };

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
    { title: 'Order At', dataIndex: 'createdAt', key: 'createdAt', 
      render: (date) => {
        const orderAt = new Date(date);
        const options = {
          year: "numeric",
          month: "short", // Use short month format (e.g., Nov)
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        };
        // Format the date and time
        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(orderAt);
        // Remove "at" if present (just in case)
        return formattedDate.replace(", at", ","); 
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            shape="circle"
            title="Edit"
          />
          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              type="text"
              icon={<DeleteOutlined />}
              shape="circle"
              title="Delete"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
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

      <Table columns={columns} dataSource={data} rowKey="_id"  pagination={{
          pageSize: '5',
        }}/>

      {/* Edit Modal */}
      <Modal
        title="Edit Status"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="edit_form">
          <Form.Item name="address" label="Address">
            <Input disabled />
          </Form.Item>
          <Form.Item name="cityName" label="City">
            <Input disabled />
          </Form.Item>
          <Form.Item name="districtName" label="District">
            <Input disabled />
          </Form.Item>
          <Form.Item name="wardName" label="Ward">
            <Input disabled />
          </Form.Item>
          <Form.Item name="totalPrice" label="Total Price">
            <Input type="string" disabled />
          </Form.Item>
          <Form.Item name="paymentMethod" label="Payment Method">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select>
              <Option value="pending">Pending</Option>
              <Option value="completed">Completed</Option>
              <Option value="cancelled">Cancelled</Option>
              <Option value="delivered">Delivered</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminPurchaseOrder;
