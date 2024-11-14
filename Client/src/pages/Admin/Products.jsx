import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, message, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const AdminProduct = () => {
  const [data, setData] = useState([
    { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
    { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
    { key: '3', name: 'Joe Black', age: 29, address: 'Sidney No. 1 Lake Park' },
  ]);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsAddModalVisible(false);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      setData((prevData) =>
        prevData.map((item) => (item.key === editingRecord.key ? { ...item, ...values } : item))
      );
      message.success('Record updated successfully!');
      handleCancel();
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  const handleAdd = () => {
    form.validateFields().then((values) => {
      const newRecord = {
        ...values,
        key: (data.length + 1).toString(),
      };
      setData([...data, newRecord]);
      message.success('New record added successfully!');
      handleCancel();
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
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
          <Button
            danger
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
            shape="circle"
            title="Delete"
          />
        </Space>
      ),
    },
  ];

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
    message.success('Record deleted successfully!');
  };

  return (
    <>
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col>
          <Input.Search
            placeholder="Search by name"
            enterButton
            onSearch={(value) => setSearchText(value)}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsAddModalVisible(true)}
          >
            Add New
          </Button>
        </Col>
      </Row>
      
      <Table columns={columns} dataSource={filteredData} />

      {/* Edit Modal */}
      <Modal
        title="Edit Record"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="edit_form">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: 'Please enter the age' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter the address' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Add New Record Modal */}
      <Modal
        title="Add New Record"
        visible={isAddModalVisible}
        onOk={handleAdd}
        onCancel={handleCancel}
        okText="Add"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="add_form">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: 'Please enter the age' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter the address' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminProduct;
