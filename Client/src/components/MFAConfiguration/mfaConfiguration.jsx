import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, message, Steps, theme } from 'antd';
import './style.css';
import { RightOutlined, LeftOutlined, CheckOutlined } from '@ant-design/icons';
import UploadImage from '../uploadImage';
import RelationTypes from '../relationTypes';
import EstablishRelationTypes from '../establishRelationTypes';
import { useSelector } from 'react-redux';

MFAConfiguration.propTypes = {
    
};

const steps = [
    {
      title: 'Upload Images',
      content: <UploadImage/>,
    },
    {
      title: 'Create Relation Types',
      content: <RelationTypes/>,
    },
    {
      title: 'Establish Relations',
      content: <EstablishRelationTypes/>,
    },
  ];

function MFAConfiguration(props) {
const { token } = theme.useToken();
const [current, setCurrent] = useState(0);
const systemConfig = useSelector(state => state.mfa.systemConfiguration)
const imageList = useSelector(state => state.mfa.imageList)
const relationTypes = useSelector(state => state.mfa.relationTypes)
const relationships = useSelector(state => state.mfa.relationships)
const relationshipsCondition = (imageList, relationships) => {
  let newImageList = [...imageList];
  for (const image of imageList) {
    if(Array.isArray(relationships) && relationships.length == 0) {
      return false;
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
    for(const image of newImageList) {
      if (!image.isConfig) {
        return false;
      }
    }
    return true;
  }
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle  = {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '30%',
    // lineHeight: '440px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
    return (
      <div className='padding-v-24'>
        <Steps
          current={current}
          items={items}
          style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
        />
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24, marginLeft: "auto", marginRight: "auto", textAlign: 'center' }}>
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()} icon={<LeftOutlined />}>
              Previous
            </Button>
          )}
          {/* upload image step */}
           {current < steps.length - 1 && current == 0 && (
            <Button type="primary" onClick={() => next()} icon={<RightOutlined />} iconPosition='end' disabled={systemConfig.numOfUploadedImages <= imageList.length ? false : true}>
              Next
            </Button>
          )}
          {/* add relations types step */}
           {current < steps.length - 1 && current == 1 && (
            <Button type="primary" onClick={() => next()} icon={<RightOutlined />} iconPosition='end' disabled={systemConfig.numOfRelationTypes <= relationTypes.length ? false : true}>
              Next
            </Button>
          )}
          {/*establish relationships step */}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
              // disabled={true}
              disabled={relationshipsCondition(imageList, relationships) == false ? true : false}
            >
              Register 
            </Button>
          )}
        </div>
      </div>
    );
}

export default MFAConfiguration;