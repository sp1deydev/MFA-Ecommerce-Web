import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, message, Row, Col, Upload, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined, EyeOutlined } from '@ant-design/icons';

const AdminProduct = () => {
  const [data, setData] = useState([
    { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', image: null },
    { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', image: null },
    { key: '3', name: 'Joe Black', age: 29, address: 'Sidney No. 1 Lake Park', image: null },
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

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
    message.success('Record deleted successfully!');
  };

  const handleViewDetail = (record) => {
    setViewingRecord(record);
    setIsViewDetailVisible(true);
  };

  const handleImageChange = ({ fileList }) => {
    form.setFieldsValue({ image: fileList });
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
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) =>
        image ? <img src={URL.createObjectURL(image)} alt="product" style={{ width: 50 }} /> : 'No Image',
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
          <Form.Item name="image" label="Upload Image">
            <Upload
              listType="picture"
              maxCount={1}
              onChange={handleImageChange}
              beforeUpload={() => false} // Prevents automatic upload
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
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
          <Form.Item name="image" label="Upload Image">
            <Upload
              listType="picture"
              maxCount={1}
              onChange={handleImageChange}
              beforeUpload={() => false} // Prevents automatic upload
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* View Detail Modal */}
      <Modal
        title="View Record Details"
        visible={isViewDetailVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
            <p>Comming soon...</p>
        {/* {viewingRecord && (
          <>
            <p><strong>Name:</strong> {viewingRecord.name}</p>
            <p><strong>Age:</strong> {viewingRecord.age}</p>
            <p><strong>Address:</strong> {viewingRecord.address}</p>
            <p>
              <strong>Image:</strong>{' '}
              {viewingRecord.image ? (
                <img src={URL.createObjectURL(viewingRecord.image)} alt="product" style={{ width: 100 }} />
              ) : (
                'No Image'
              )}
            </p>
          </>
        )} */}
      </Modal>
    </>
  );
};

export default AdminProduct;
