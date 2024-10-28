import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Select, Button  } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UndoOutlined } from '@ant-design/icons';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import { toast } from 'react-toastify';
import { mfaSlice } from '../../../redux/mfaSlice';

const { Option } = Select;

const SelectImagesStep = () => {
  const dispatch = useDispatch();
  const relationships = useSelector((state) => state.mfa.relationships)
  const systemConfig = useSelector((state) => state.mfa.systemConfiguration)
  // Dữ liệu ảnh, thêm bao nhiêu ảnh tùy thích vào mảng này
  const images = useSelector(state => state.mfa.imageList)
  const options = useSelector(state => state.mfa.relationTypes)

  // Trạng thái chọn của ảnh (mảng này cũng tự động điều chỉnh theo số lượng ảnh)
  const [selectedImages, setSelectedImages] = useState(new Array(images.length).fill(false));
  const [selectedImagesInfo, setSelectedImagesInfo] = useState([]);
  

  const toggleSelectImage = (index) => {
    const selectedCount = selectedImages.filter((selected) => selected).length;
    if (!selectedImages[index] && selectedCount >= systemConfig.numOfAuthenticatedImages) {
      toast.warn(`You can only select up to ${systemConfig.numOfAuthenticatedImages} images.`);
      dispatch(mfaSlice.actions.setUserSelectedImages(selectedImagesInfo));
      return;
    }
    const newSelectedImages = [...selectedImages];
    newSelectedImages[index] = !newSelectedImages[index];
    setSelectedImages(newSelectedImages);
  
    const newSelectedImagesInfo = newSelectedImages
      .map((isSelected, i) => isSelected ? images[i] : null)
      .filter((img) => img !== null);
  
    dispatch(mfaSlice.actions.setUserSelectedImages(newSelectedImagesInfo));
    setSelectedImagesInfo(newSelectedImagesInfo);
  };

  const handleReset = (value) => {
    setSelectedImagesInfo([]);
    setSelectedImages(new Array(images.length).fill(false));
    dispatch(mfaSlice.actions.setUserSelectedImages([]))
  };

  return (
    <div style={{padding:'12px'}}>
      <div style={{marginBottom: '12px', display: 'flex', justifyContent: 'space-between'}}>
        <span>
          Select your images     
        </span>
        <Button
          type="text"
          icon={<UndoOutlined />}
          onClick={handleReset}
        />
      </div>
      <Row gutter={[16, 16]}>
        {images.map((image, index) => (
          <Col span={6} key={index}>
            <div
              style={{
                position: 'relative',
                opacity: selectedImages[index] ? 0.2 : 1, // Làm mờ ảnh khi được chọn
                cursor: 'pointer',
              }}
              onClick={() => toggleSelectImage(index)}
            >
              <img
                src={image.url}
                alt={image.alt}
                style={{
                  width: '128px',
                  height: '128px',
                  borderRadius: '4px',
                //   border: '1px solid #0066CC',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', // Add shadow to the image
                }}
              />
              {selectedImages[index] && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              )}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SelectImagesStep;
