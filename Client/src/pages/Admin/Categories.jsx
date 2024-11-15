import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, message, Row, Col, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';

const AdminCategory = () => {
  const [data, setData] = useState([
    { key: '1', id: '101', name: 'Electronics', description: 'Category for electronic items' },
    { key: '2', id: '102', name: 'Furniture', description: 'Category for furniture items' },
    { key: '3', id: '103', name: 'Clothing', description: 'Category for clothing and apparel' },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isViewDetailVisible, setIsViewDetailVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [viewingRecord, setViewingRecord] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const generateUniqueId = () => {
    const maxId = data.reduce((max, item) => Math.max(max, parseInt(item.id, 10)), 0);
    return (maxId + 1).toString();
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsAddModalVisible(false);
    setIsViewDetailVisible(false);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const updatedData = data.map((item) =>
        item.key === editingRecord.key ? { ...item, ...values } : item
      );
      setData(updatedData);
      message.success('Record updated successfully!');
      handleCancel();
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  const handleAdd = () => {
    form.validateFields().then((values) => {
      const newRecord = {
        key: (data.length + 1).toString(),
        id: generateUniqueId(),
        ...values,
      };
      setData([...data, newRecord]);
      message.success('New record added successfully!');
      handleCancel();
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
    message.success('Record deleted successfully!');
  };

  const handleViewDetail = (record) => {
    setViewingRecord(record);
    setIsViewDetailVisible(true);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
            shape="circle"
            title="View Detail"
          />
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
            placeholder="Search by name"
            enterButton
            onSearch={(value) => setSearchText(value)}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 360 }}
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
        title="Edit Category"
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
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the description' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Add New Record Modal */}
      <Modal
        title="Add New Category"
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
            rules={[{ required: true, message: 'Please enter the name' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the description' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* View Detail Modal */}
      <Modal
        title="View Category Details"
        visible={isViewDetailVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {viewingRecord && (
          <>
            <p><strong>ID:</strong> {viewingRecord.id}</p>
            <p><strong>Name:</strong> {viewingRecord.name}</p>
            <p><strong>Description:</strong> {viewingRecord.description}</p>
          </>
        )}
      </Modal>
    </>
  );
};

export default AdminCategory;
