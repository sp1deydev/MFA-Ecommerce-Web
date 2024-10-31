import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Button, Card, Typography, Space } from 'antd';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { systemApi } from '../../api/systemApi';
import { useDispatch, useSelector } from 'react-redux';
import { mfaSlice } from '../../redux/mfaSlice';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const SystemSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const systemConfiguration = useSelector((state) => state.mfa.systemConfiguration)
  const isSystemLoading = useSelector((state) => state.mfa.isLoading)
  useEffect(() => {
    const handleSystemConfig = async () => {
      try {
        dispatch(mfaSlice.actions.setIsLoading(true))
        const systemConfig = await systemApi.getSystemConfig();
        console.log(systemConfig)
          dispatch(mfaSlice.actions.setSystemConfiguration(systemConfig.data.data));
          if(systemConfig.data.data) {
            setFormValues({
              minImagesToUpload: systemConfig.data.data.numOfUploadedImages,
              imagesDisplayed: systemConfig.data.data.numOfAuthenticatedImages,
              minRelationships: systemConfig.data.data.numOfRelationTypes,
              imagesRelated: systemConfig.data.data.numOfImageEachRelationType,
            })
          }
          dispatch(mfaSlice.actions.setIsLoading(false))
          if(window.location.pathname.includes('/system/first-login/settings') && isSystemConfig && !isSystemLoading) {
            toast.info('You have to set system configuration first');
          }
      } catch (err) {
        dispatch(mfaSlice.actions.setIsLoading(false))
        toast.error(err.response.data.message || "Get System Configuration Error or System is not configured");
      }
    }
    handleSystemConfig();
  }, []);
  const [formValues, setFormValues] = useState({
    minImagesToUpload: systemConfiguration.numOfUploadedImages,
    imagesDisplayed: systemConfiguration.numOfAuthenticatedImages,
    minRelationships: systemConfiguration.numOfRelationTypes,
    imagesRelated: systemConfiguration.numOfImageEachRelationType,
  });
  const [isEditable, setIsEditable] = useState({
    minImagesToUpload: false,
    imagesDisplayed: false,
    minRelationships: false,
    imagesRelated: false,
  });

  const toggleEdit = (field) => {
    setIsEditable((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const onFinish = async () => {
    console.log('Form submitted with values:', formValues);
    if(!systemConfiguration.id) {
      try {
        const payload = {
          numOfUploadedImages: formValues.minImagesToUpload,
          numOfAuthenticatedImages: formValues.imagesDisplayed,
          numOfRelationTypes: formValues.minRelationships,
          numOfImageEachRelationType: formValues.imagesRelated,
        }
        await systemApi.config(payload);
        toast.success('System Config Successfully');

      } catch (err) {
        toast.error(err.response.data.message || "System Config Error");
      }
    }
  };

  // Check if any field is in edit mode
  const isAnyFieldEditable = Object.values(isEditable).some((editable) => editable);
  const isSystemConfig = Object.values(formValues).some((value) => {
    if (!value) return true;
  })
  console.log('configured', isSystemConfig);

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
                {field === 'imagesDisplayed' && 'Images displayed when authentication'}
                {field === 'minRelationships' && 'Minimum relation types'}
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
            disabled={isAnyFieldEditable || isSystemConfig} // Disable submit when any field is in edit mode
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SystemSettings;
