import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, message, Row, Col, Popconfirm, Select } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { productApi } from '../../api/productApi';
import axiosClient from '../../api/axiosClient';
import { categoryApi } from '../../api/categoryApi';

const AdminProduct = () => {
  const [data, setData] = useState([
    {
      key: '1',
      _id: '1',
      name: 'Testing Product',
      price: 12131111,
      quantity: 4,
      description: 'Test description',
      category: 'Apple',
      image: null,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isViewDetailVisible, setIsViewDetailVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [image, setImage] = useState();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [viewingRecord, setViewingRecord] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  const getAllCategories = async function () {
    try {
      const response = await categoryApi.getAllCategories();
      let categories = [];
      response.data.data.forEach((category) => {
        categories.push({ label: category.name, value: category.name });
      });
      setCategoryOptions(categories);
    } catch (err) {
      console.error(err);
    }
  };

  const getAllProducts = async function () {
    try {
      const response = await productApi.getAllProducts();
      setData(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleChangeImage = (event) => {
    setImage(event.target.files[0]);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue({ ...record, image: record.image || '' });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsAddModalVisible(false);
    setIsViewDetailVisible(false);
    form.resetFields();
  };

  const handleSave = () => {
    form
      .validateFields()
      .then( async (values) => {
        try {
          if (image) {
            const formData = new FormData();
            formData.append('image', image);
            await axiosClient
              .post('/products/upload-image', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then(async (response) => {
                const updatedProduct = {...values, image: response.data.image_url, id: editingRecord._id };
                await productApi.updateProduct(updatedProduct);
                getAllProducts();
                message.success('Record updated successfully!');
                handleCancel();
              });
          }
        } catch (err) {
          console.error(err);
        }
        
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleAdd = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          if (image) {
            const formData = new FormData();
            formData.append('image', image);
            await axiosClient
              .post('/products/upload-image', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then(async (response) => {
                const newProduct = { ...values, image: response.data.image_url };
                message.success('Product added successfully!');
                await productApi.createProduct(newProduct);
                getAllProducts();
                handleCancel();
              });
          }
        } catch (error) {
          console.error(error);
        }
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleDelete = async (id) => {
    try {
      await productApi.deleteProduct({id});
      message.success('Product deleted successfully!');
      getAllProducts();
    } catch (err) {
      console.error(err);
      message.success('Product deleted error!');
    }
  };

  const handleViewDetail = (record) => {
    setViewingRecord(record);
    setIsViewDetailVisible(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price.toLocaleString()}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) =>
        image ? <img src={image} alt="product" style={{ width: 50 }} /> : 'No Image',
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

      <Table columns={columns} dataSource={filteredData} pagination={{ defaultPageSize: 6}}/>

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
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: 'Please enter the price' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value >= 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Price must be a non-negative value'));
                },
              }),
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              { required: true, message: 'Please enter the quantity' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value >= 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Quantity must be a non-negative value'));
                },
              }),
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select the category' }]}>
            <Select options={categoryOptions} placeholder="Select a category" />
          </Form.Item>
          <Form.Item
  name="image"
  label="Upload Image"
  rules={[{ required: true, message: 'Please select an image!' }]}
  style={{ marginBottom: 20 }}
>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {editingRecord?.image ? (
      <div style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f7f7f7', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <p
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '10px',
            letterSpacing: '0.5px',
          }}
        >
          Old Image
        </p>
        <img
          src={editingRecord.image}
          alt="product"
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'cover',
            borderRadius: '8px',
            border: '2px solid #ddd',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>
    ) : (
      <p style={{ fontStyle: 'italic', color: '#a0a0a0' }}>No Image</p>
    )}
    <div style={{ marginTop: '10px' }}>
      <input
        type="file"
        onChange={handleChangeImage}
        id="avatar"
        name="file"
        accept="image/png, image/jpeg"
        style={{
          padding: '6px',
          // backgroundColor: '#007bff',
          // color: 'white',
          borderRadius: '4px',
          cursor: 'pointer',
          border: 'none',
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => {e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#fff'}}
        onMouseOut={(e) =>  {e.target.style.backgroundColor = '#fff'; e.target.style.color = '#000'}}
      />
    </div>
  </div>
</Form.Item>

        </Form>
      </Modal>

      {/* Add Modal */}
      <Modal
        title="Add New Record"
        visible={isAddModalVisible}
        onOk={handleAdd}
        onCancel={handleCancel}
        okText="Add"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="add_form">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: 'Please enter the price' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value >= 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Price must be a non-negative value'));
                },
              }),
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              { required: true, message: 'Please enter the quantity' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value >= 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Quantity must be a non-negative value'));
                },
              }),
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select the category' }]}>
            <Select options={categoryOptions} placeholder="Select a category" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Upload Image"
            rules={[{ required: true, message: 'Please select an image!' }]}
            style={{ marginBottom: 10 }}
          >
            <div>
              <input type="file" onChange={handleChangeImage} id="avatar" name="file" accept="image/png, image/jpeg" />
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* View Detail Modal */}
      <Modal
        title="Product Details"
        visible={isViewDetailVisible}
        onCancel={() => setIsViewDetailVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsViewDetailVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {viewingRecord && (
          <div>
            <p><strong>Name:</strong> {viewingRecord.name}</p>
            <p><strong>Price:</strong> ${viewingRecord.price}</p>
            <p><strong>Quantity:</strong> {viewingRecord.quantity}</p>
            <p><strong>Description:</strong> {viewingRecord.description}</p>
            <p><strong>Category:</strong> {viewingRecord.category}</p>
            <p><strong>Image:</strong></p>
            {viewingRecord.image && <img src={viewingRecord.image} alt="product" style={{ width: 200 }} />}
          </div>
        )}
      </Modal>
    </>
  );
};

export default AdminProduct;
