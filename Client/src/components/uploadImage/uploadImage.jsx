import React, { useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Image, Upload, Button } from 'antd';
import './style.css'
import axios from 'axios';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { mfaSlice } from '../../redux/mfaSlice';


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const UploadImage= () => {
  const dispatch = useDispatch();
  const imageList = useSelector((state)=> state.mfa.imageList) || [];
  const systemConfig = useSelector((state)=> state.mfa.systemConfiguration) || {};
  console.log(imageList);
  console.log('image:',imageList)
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const textColor = imageList.filter(file => file.status === 'done').length >= systemConfig.numOfUploadedImages ? 'success-text' : 'error-text';
  const countImage = imageList.filter(file => file.status === 'done').length;

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:3001/images/upload', formData);
      if (response.data.success) {
        toast.success(response.data.message)
      }
      return {
        ...file,
        name: response.data.fileName,
        status: 'done',
        url: `http://localhost:3001/${response.data.filePath}`,
      };
    } catch (error) {
      return {
        ...file,
        status: 'error',
      };
    }
  };

  const handleChange = async (info) => {
    let newFileList = [...info.fileList];

    // Process each file to handle uploads
    const processedFiles = await Promise.all(newFileList.map(async (file) => {
      if (file.status === 'uploading') {
        return file; // Skip already uploading files
      }
      if (file.status === 'done' || file.status === 'error') {
        return file; // Skip already processed files
      }
      const uploadedFile = await uploadFile(file.originFileObj);
      return uploadedFile;
    }));

    // Update file list with the processed files
    dispatch(mfaSlice.actions.setImageList(processedFiles))
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || (file.preview));
    setPreviewOpen(true);
  };

  const uploadButton = (
    <Button icon={<UploadOutlined />} style={{margin: '16px'}}>Upload </Button>
  );
  
  return (
    <>
    <div style={{ padding: '8px', textAlign: 'center', }}>
    <div className='margin-8'>Upload at least {systemConfig.numOfUploadedImages} photos, and there should be at least one photo of yourself </div>
    <div className={textColor}>
        Successfully Uploaded: {countImage}/{systemConfig.numOfUploadedImages}
    </div>
      <Upload
        listType="text"
        fileList={imageList}
        onPreview={handlePreview}
        onChange={handleChange}
        // showUploadList={false}
        beforeUpload={() => false}
      >
        {uploadButton}  
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
      </div>
    </>
  );
};

export default UploadImage;