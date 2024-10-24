import React, { useState } from 'react';
import { Row, Col, Modal } from 'antd';
import { useSelector } from 'react-redux';

const EstablishRelationTypes = () => {
    // Dữ liệu ảnh, thêm bao nhiêu ảnh tùy thích vào mảng này
    const images = useSelector(state => state.mfa.imageList)
//     const images = [
//     { src: "https://via.placeholder.com/300", alt: "Image 1" },
//     { src: "https://via.placeholder.com/300", alt: "Image 2" },
//     { src: "https://via.placeholder.com/300", alt: "Image 3" },
//     { src: "https://via.placeholder.com/300", alt: "Image 4" },
//     { src: "https://via.placeholder.com/300", alt: "Image 5" },
//     { src: "https://via.placeholder.com/300", alt: "Image 6" },
//     { src: "https://via.placeholder.com/300", alt: "Image 7" },
//   ];

  // Trạng thái quản lý viền của từng ảnh (mảng này tự động điều chỉnh theo số lượng ảnh)
  const [borders, setBorders] = useState(new Array(images.length).fill(false));
  // Trạng thái chọn của ảnh (mảng này cũng tự động điều chỉnh theo số lượng ảnh)
  const [selectedImages, setSelectedImages] = useState(new Array(images.length).fill(false));
  const [selectedImagesInfo, setSelectedImagesInfo] = useState([]);
  // Trạng thái của Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Hàm chọn hoặc bỏ chọn ảnh
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

    // Kiểm tra số ảnh đã được chọn
    const selectedCount = newSelectedImages.filter((selected) => selected).length;
    if (selectedCount === 2) {
      setIsModalVisible(true); // Hiển thị modal nếu có 2 ảnh được chọn
    }
  };

  // Hàm đóng modal và hủy trạng thái chọn
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedImagesInfo([]);
    setSelectedImages(new Array(images.length).fill(false)); // Hủy chọn, làm mới trạng thái
  };
  console.log('test', selectedImagesInfo)
  return (
    <div style={{padding:'12px'}}>
      <Row gutter={[16, 16]}>
        {images.map((image, index) => (
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
                  border: `2px solid ${borders[index] ? 'green' : 'red'}`, // Trạng thái viền cho chức năng khác
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
        title="You selected 2 images"
        visible={isModalVisible}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        width={660}
      >
        <p>Two images have been selected!</p>
        <p>{selectedImagesInfo && selectedImagesInfo.length && selectedImagesInfo[0]?.url}</p>
        <p>{selectedImagesInfo && selectedImagesInfo.length && selectedImagesInfo[1]?.url}</p>
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
