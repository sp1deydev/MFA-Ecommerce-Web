import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, message, Steps, theme } from 'antd';
import { RightOutlined, LeftOutlined, CheckOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import SelectImagesStep from './SelectImagesStep';
import SelectRelationTypeStep from './SelectRelationTypeStep';

MFA.propTypes = {
    
};

const steps = [
    {
      title: 'Choose Your Images',
      content: <SelectImagesStep/>,
    },
    {
      title: 'Choose Relation Type',
      content: <SelectRelationTypeStep/>,
    },
    // {
    //   title: 'Establish Relations',
    //   content: <EstablishRelationTypes/>,
    // },
  ];

function MFA(props) {
const { token } = theme.useToken();
const [current, setCurrent] = useState(0);
const systemConfig = useSelector(state => state.mfa.systemConfiguration)
const userSelectedImages = useSelector(state => state.mfa.userSelectedImages)
const userSelectedRelationType = useSelector(state => state.mfa.userSelectedRelationType)

    const confirmSelectImage = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle  = {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '40%',
    // lineHeight: '440px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
    return (
      <div className='padding-v-40'>
        <Steps
          current={current}
          items={items}
          style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
        />
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24, marginLeft: "auto", marginRight: "auto", textAlign: 'center' }}>
          {/* choose images step */}
           {current < steps.length - 1 && current == 0 && (
            <Button type="primary" onClick={() => confirmSelectImage()} icon={<RightOutlined />} iconPosition='end' disabled={systemConfig.numOfAuthenticatedImages == userSelectedImages.length ? false : true}>
              Authenticate
            </Button>
          )}
            {/* choose relation type step */}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
              // disabled={true}
              disabled={!userSelectedRelationType ? true : false}
            >
              Authenticate 
            </Button>
          )}
        </div>
      </div>
    );
}

export default MFA;