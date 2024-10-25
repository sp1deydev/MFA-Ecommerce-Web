import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Select, Button  } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { mfaSlice } from '../../redux/mfaSlice';
import { UndoOutlined } from '@ant-design/icons';
import isEqual from 'lodash/isEqual';
import { toast } from 'react-toastify';

const { Option } = Select;

const EstablishRelationTypes = () => {
  const dispatch = useDispatch();
  const relationships = useSelector((state) => state.mfa.relationships)
  // Dữ liệu ảnh, thêm bao nhiêu ảnh tùy thích vào mảng này
  const images = useSelector(state => state.mfa.imageList)
  const options = useSelector(state => state.mfa.relationTypes)
  const [toggleLoading, setToggleLoading] = useState(false);
  const [isEstablished, setIsEstablished] = useState(false);
  const [selectedRelationType, setSelectedRelationType] = useState('');
  const [displayImages, setDisplayImages] = useState(images)
  const [isModalVisible, setIsModalVisible] = useState(false);


  //function to get value for color of border (green or red depending on isConfig property)
  const setDisplayImageStatus = (imageList, relationships) => {
    let newImageList = [...imageList];
    for (const image of imageList) {
      if(Array.isArray(relationships) && relationships.length == 0) {
        console.log('notok') 
        return imageList;
      }
      for (const relationship of relationships) {
        let images = relationship?.images;
        if(Array.isArray(images) && images.length == 0) {
          continue;
        }
        for (const relatedImage of images) {
          if (relatedImage.name === image.name) {
            const index = newImageList.findIndex(item => item.name == relatedImage.name)
            let newImageInfo = {... newImageList[index]}
            newImageInfo.isConfig = true;
            newImageList[index] = newImageInfo;
          }
        }
       }
      }
      return newImageList;
    }
    //get relation type when editing relation type of images
    const setCurrentRelationType = (selectedImagesInfo, relationships) => {
      let relationType = options[0].value;
        if(Array.isArray(relationships) && relationships.length == 0) {
          return relationType
        }
        for (const relationship of relationships) {
          const isExised = isEqual(relationship.images, selectedImagesInfo)
          if(isExised) {
            setIsEstablished(true)
            relationType = relationship.relationType
            return relationType
          }
        }
        setIsEstablished(false)
        return relationType;
    }


  useEffect(() => {
    setDisplayImages(setDisplayImageStatus(images, relationships))
    console.log('relationType1', selectedRelationType)
    console.log('imageselect1', selectedImagesInfo)
    console.log('relationship1', relationships)
  }, [toggleLoading])
  
  useEffect(() => {
    setSelectedRelationType(setCurrentRelationType(selectedImagesInfo, relationships))
    console.log('relationType', selectedRelationType)
    console.log('imageselect', selectedImagesInfo)
    console.log('relationship', relationships)
  }, [isModalVisible, toggleLoading, isEstablished])

// Trạng thái quản lý viền của từng ảnh (mảng này tự động điều chỉnh theo số lượng ảnh)
const [borders, setBorders] = useState(new Array(images.length).fill(false));

// Trạng thái chọn của ảnh (mảng này cũng tự động điều chỉnh theo số lượng ảnh)
const [selectedImages, setSelectedImages] = useState(new Array(images.length).fill(false));
const [selectedImagesInfo, setSelectedImagesInfo] = useState([]);

  const toggleSelectImage = (index) => {
    const newSelectedImages = [...selectedImages];
    newSelectedImages[index] = !newSelectedImages[index]; // Chọn hoặc bỏ chọn ảnh
    setSelectedImages(newSelectedImages);
    if(newSelectedImages[index]) {
        const newSelectedImagesInfo = [...selectedImagesInfo];
        newSelectedImagesInfo.push(images[index])
        setSelectedImagesInfo(newSelectedImagesInfo);
    }
    if(!newSelectedImages[index]) {
        let newSelectedImagesInfo = [...selectedImagesInfo];
        newSelectedImagesInfo.splice(index, 1)
        setSelectedImagesInfo(newSelectedImagesInfo);
    }

    const selectedCount = newSelectedImages.filter((selected) => selected).length;
    if (selectedCount === 2) {
      setIsModalVisible(true); // Hiển thị modal nếu có 2 ảnh được chọn
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setIsEstablished(false)
    setSelectedImagesInfo([]);
    setSelectedImages(new Array(images.length).fill(false));
  };
  const handleConfirmRelationship = () => {
    const item = {
      images: selectedImagesInfo,
      relationType: selectedRelationType,
    }
    if(!isEstablished) {
      console.log('here')
      let newRelationships = [...relationships]
      newRelationships.push(item)
      dispatch(mfaSlice.actions.setRelationships(newRelationships))
    }
    else {
      console.log('there')
      for (const relationship of relationships) {
        let index = 0;
        const isExised = isEqual(relationship.images, selectedImagesInfo)
        if(isExised) {
          let newRelationships = [...relationships]
          if(selectedRelationType == newRelationships[index].relationType) {
            break;
          }
          newRelationships[index] = item
          dispatch(mfaSlice.actions.setRelationships(newRelationships))
          break;
        }
        index ++;
      }
    }
    //reset
    setIsModalVisible(false);
    setSelectedImagesInfo([]);
    setSelectedImages(new Array(images.length).fill(false));
    setSelectedRelationType('')
    setToggleLoading(!toggleLoading);
    setIsEstablished(false)
  };

  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
    setSelectedRelationType(value)
  };
  const handleReset = (value) => {
    setToggleLoading(!toggleLoading);
    dispatch(mfaSlice.actions.setRelationships([]))
  };
  const onDelRelationType = (value) => {
    //delete is not working properly
    //maybe find index is not true
    for (const relationship of relationships) {
      let index = 0;
      const isExised = isEqual(relationship.images, selectedImagesInfo)
      if(isExised) {
        let newRelationships = [...relationships]
        newRelationships.splice(index, 1)
        dispatch(mfaSlice.actions.setRelationships(newRelationships))
        //reset
        setIsModalVisible(false);
        setSelectedImagesInfo([]);
        setSelectedImages(new Array(images.length).fill(false));
        setSelectedRelationType('')
        setToggleLoading(!toggleLoading);
        setIsEstablished(false)
        return;
      }
      index ++;
    }
    // toast.success('Deleted relationship')
    
  };
  return (
    <div style={{padding:'12px'}}>
      <div style={{marginBottom: '12px', display: 'flex', justifyContent: 'space-between'}}>
        <span className='text-primary-color'>
          Set relationship for each image        
        </span>
        <Button
          type="text"
          icon={<UndoOutlined />}
          onClick={handleReset}
        />
      </div>
      <Row gutter={[16, 16]}>
        {displayImages.map((image, index) => (
          <Col span={8} key={index}>
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
                  border: `3px solid ${image.isConfig ? 'green' : 'red'}`, // Trạng thái viền cho chức năng khác
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
                    // backgroundColor: 'rgba(0, 0, 0, 0.3)', // Overlay khi được chọn
                  }}
                />
              )}
            </div>
          </Col>
        ))}
      </Row>

      {/* Modal sẽ xuất hiện khi 2 ảnh được chọn */}
      <Modal
        title="Establish Relationship"
        visible={isModalVisible}
        onOk={handleConfirmRelationship}
        onCancel={handleCloseModal}
        width={660}
        footer={ isEstablished ? [
          <Button type='primary' key="del" danger onClick={onDelRelationType}>
            Delete
          </Button>,
          <Button key="back" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button key="establish" type="primary" onClick={handleConfirmRelationship}>
            Establish
          </Button>,
        ] :
        [
          <Button key="back" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button key="establish" type="primary" onClick={handleConfirmRelationship}>
            Establish
          </Button>,
        ]
      }
      >
        <Select
          value={selectedRelationType}
          style={{ width: '100%', margin: '20px 0px' }}
          onChange={handleChange}
        >
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
        <Row gutter={[16, 16]}>
        {selectedImagesInfo.map((image) => (
          <Col span={12}>
              <img
                src={image.url}
                alt={image.alt}
                style={{
                  width: '300px',
                  height: '300px',
                  borderRadius: '4px',
                }}
              />
            </Col>
        ))}
      </Row>
      </Modal>
    </div>
  );
};

export default EstablishRelationTypes;