import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, message, Row, Col, Popconfirm, Select, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { userApi } from '../../api/userApi';
import { capitalizeFirstLetter } from '../../helpers/toUpperCase';
import { authApi } from '../../api/authApi';

const { Option } = Select;

const roleColors = {
  admin: 'volcano',
  user: 'blue',
  system: 'green',
};

const AdminUser = () => {
  const [data, setData] = useState([]);

  const getAllUsers = async function() {
    try {
        await authApi.getCurrentUser();
        const response = await userApi.getAllUsers();
        console.log(response);
        setData(response.data.data);
      }  catch (err) {
      }
  }
  useEffect(() => {
    getAllUsers()
  }, [])

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsAddModalVisible(false);
    form.resetFields();
    addForm.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const updatedData = data.map((item) =>
        item.key === editingRecord.key ? { ...item, role: values.role } : item
      );
      setData(updatedData);
      message.success('Role updated successfully!');
      handleCancel();
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  const handleAdd = () => {
    addForm.validateFields().then((values) => {
      const newUser = {
        key: uuidv4(),
        _id: uuidv4(),
        ...values,
      };
      setData([...data, newUser]);
      message.success('User added successfully!');
      handleCancel();
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
    message.success('Record deleted successfully!');
  };

  const columns = [
    { title: 'ID', dataIndex: '_id', key: '_id' },
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'First Name', dataIndex: 'firstname', key: 'firstname' },
    { title: 'Last Name', dataIndex: 'lastname', key: 'lastname' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={roleColors[role]}>{capitalizeFirstLetter(role)}</Tag>
      ),
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
            onConfirm={() => handleDelete(record.key)}
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
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col>
          <Input.Search
            placeholder="Search by any field"
            enterButton
            onChange={(e) => console.log(e.target.value)} // Simple search handler
            style={{ width: 360 }}
          />
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsAddModalVisible(true)}
          >
            Add New User
          </Button>
        </Col>
      </Row>

      <Table columns={columns} dataSource={data} />

      {/* Edit Modal */}
      <Modal
        title="Edit Role"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="edit_form">
          <Form.Item name="username" label="Username">
            <Input disabled />
          </Form.Item>
          <Form.Item name="firstname" label="First Name">
            <Input disabled />
          </Form.Item>
          <Form.Item name="lastname" label="Last Name">
            <Input disabled />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
              <Option value="system">System</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Modal */}
      <Modal
        title="Add New User"
        visible={isAddModalVisible}
        onOk={handleAdd}
        onCancel={handleCancel}
        okText="Add"
        cancelText="Cancel"
      >
        <Form form={addForm} layout="vertical" name="add_form">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter a username' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="firstname"
            label="First Name"
            rules={[{ required: true, message: 'Please enter the first name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastname"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter the last name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter an email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="User">User</Option>
              <Option value="System">System</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminUser;
