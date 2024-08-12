import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, message, Steps, theme } from 'antd';
import './style.css';
import { RightOutlined, LeftOutlined, CheckOutlined } from '@ant-design/icons';
import UploadImage from '../uploadImage';
import RelationTypes from '../relationTypes';

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
      content: 'Last-content',
    },
  ];

function MFAConfiguration(props) {
const { token } = theme.useToken();
const [current, setCurrent] = useState(0);

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
    // textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
    return (
      <>
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
           {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()} icon={<RightOutlined />} iconPosition='end'>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Register 
            </Button>
          )}
        </div>
      </>
    );
}

export default MFAConfiguration;