import React, { useState } from 'react';
import { Form, InputNumber, Button, Card, Typography, Space } from 'antd';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';

const { Text } = Typography;

const SystemSettings = () => {
  const [isEditable, setIsEditable] = useState({
    minImagesToUpload: false,
    imagesDisplayed: false,
    minRelationships: false,
    imagesRelated: false,
  });
  const [formValues, setFormValues] = useState({
    minImagesToUpload: 9,
    imagesDisplayed: 4,
    minRelationships: 5,
    imagesRelated: 2,
  });

  const toggleEdit = (field) => {
    setIsEditable((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const onFinish = () => {
    console.log('Form submitted with values:', formValues);
  };

  // Check if any field is in edit mode
  const isAnyFieldEditable = Object.values(isEditable).some((editable) => editable);

  return (
    <Card style={{ maxWidth: 400, margin: '100px auto', padding: '20px', boxShadow: '0px 4px 12px rgba(0, 102, 204, 0.2)'}}>
      <Text style={{ color: '#0066CC', fontSize: 24, textAlign: 'center', display: 'block', marginBottom: 20 }}>
        2nd Authentication Factor Requirements
      </Text>

      <Form layout="inline" onFinish={onFinish}>
        {Object.keys(formValues).map((field) => (
          <Form.Item key={field} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Space style={{ flex: 1 }}>
              <Text style={{ minWidth: 180 }}>
                {field === 'minImagesToUpload' && 'Minimum images to upload'}
                {field === 'imagesDisplayed' && 'Images displayed'}
                {field === 'minRelationships' && 'Minimum relationships'}
                {field === 'imagesRelated' && 'Images related to each other'}
              </Text>
              {isEditable[field] ? (
                <InputNumber
                  min={field === 'imagesDisplayed' ? 4 : 2}
                  value={formValues[field]}
                  onChange={(value) => handleInputChange(field, value)}
                  style={{ width: 80 }}
                />
              ) : (
                <Text>{formValues[field]}</Text>
              )}
            </Space>
            <Button
              type="link"
              icon={isEditable[field] ? <CheckOutlined /> : <EditOutlined />}
              onClick={() => toggleEdit(field)}
            />
          </Form.Item>
        ))}

        <Form.Item style={{ marginTop: 20, width: '100%' }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
            disabled={isAnyFieldEditable} // Disable submit when any field is in edit mode
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SystemSettings;
