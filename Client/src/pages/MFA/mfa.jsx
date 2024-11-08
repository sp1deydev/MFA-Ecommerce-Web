import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, message, Steps, theme } from 'antd';
import { RightOutlined, LeftOutlined, CheckOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import SelectImagesStep from './SelectImagesStep';
import SelectRelationTypeStep from './SelectRelationTypeStep';
import { systemApi } from '../../api/systemApi';
import { mfaSlice } from '../../redux/mfaSlice';
import { toast } from 'react-toastify';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { userSlice } from '../../redux/userSlice';
import { userApi } from '../../api/userApi';
import checkAuth from '../../utils/checkAuth';
import OTP from '../../components/OTP/otp';

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
  ];

function MFA(props) {
const dispatch = useDispatch();
const [searchParams, setSearchParams] = useSearchParams();
const navigate = useNavigate();
const { token } = theme.useToken();
const [current, setCurrent] = useState(0);
const systemConfig = useSelector(state => state.mfa.systemConfiguration)
const userSelectedImages = useSelector(state => state.mfa.userSelectedImages)
const randomSelectedImages = useSelector(state => state.mfa.randomSelectedImages)
const randomSystemImages = useSelector(state => state.mfa.randomSystemImages);
const randomSelectedRelationType = useSelector(state => state.mfa.randomSelectedRelationType)
const userSelectedRelationType = useSelector(state => state.mfa.userSelectedRelationType)
const authenticationDisplayImages = useSelector(state => state.mfa.authenticationDisplayImages)
const currentUser = useSelector(state => state.user.currentUser)
//get authentication data
const getAuthenticationData = async () => {
  if(checkAuth()) {
    try {
      const response = await userApi.getRandomUserImages();
      const response2 = await userApi.getRandomUserRelationType();
      let displayImages = [...randomSystemImages, ...response.data.result];
      displayImages = displayImages.sort(() => Math.random() - 0.5);
      dispatch(mfaSlice.actions.setAuthenticationDisplayImages(displayImages))
      dispatch(mfaSlice.actions.setRandomSelectedImages(response.data.result));
      dispatch(mfaSlice.actions.setRandomSelectedRelationType(response2.data.result));
    } catch (err) {
      toast.error(err.response.data.message || "Get System Configuration Error");
    }
  }
}
// 
useEffect(() => {
  const handleSystemConfig = async () => {
    try {
      const systemConfig = await systemApi.getSystemConfig();
      dispatch(mfaSlice.actions.setSystemConfiguration(systemConfig.data.data));
      const responese = await userApi.getConfig();
      dispatch(mfaSlice.actions.setRelationTypes(responese.data.result.relationtypes))
      dispatch(mfaSlice.actions.setImageList(responese.data.result.images))
      dispatch(mfaSlice.actions.setRelationships(responese.data.result.relationships))
    } catch (err) {
      if(err.response.data.message == 'access denied') {
        toast.wa("You must be logged in");
        if (window.location.pathname.includes('admin')) {
          navigate(`/admin/login`);
        } else if (window.location.pathname.includes('system')) {
          navigate(`/system/login`);
        } else {
          navigate(`/login`);
        }
        return;
      }
      toast.error(err.response.data.message || "Get System Configuration Error");
    }
  }
  handleSystemConfig();
  dispatch(mfaSlice.actions.setUserSelectedImages([]))
  dispatch(mfaSlice.actions.setUserSelectedRelationType(''))
  getAuthenticationData();
}, []);

  const confirmSelectImage = () => {
    dispatch(mfaSlice.actions.setIsLoading(true))
    const isExised = isEqual(sortBy(randomSelectedImages, 'name'), sortBy(userSelectedImages, 'name'))
    if(isExised) {
      toast.success("Correct");
      setCurrent(current + 1);
    }
    else {
      toast.error("incorect");
      dispatch(mfaSlice.actions.setUserSelectedImages([]))
      dispatch(mfaSlice.actions.setAuthenticationDisplayImages([]))
      getAuthenticationData();
    }
    dispatch(mfaSlice.actions.setIsLoading(false))

  };

  const confirmRelationType = () => {
    if(userSelectedRelationType == randomSelectedRelationType.relationtype) {
      toast.success("Correct");
      let newCurrentUser = {...currentUser}
      newCurrentUser.isMFA = true;
      dispatch(userSlice.actions.setCurrentUser(newCurrentUser))
      dispatch(userSlice.actions.setIsAuthenticated2FA(true))
      if (searchParams.get('redirect')) {
        navigate(`${searchParams.get('redirect')}`);
      }
      else {
        console.log(window.location.pathname)
        if(window.location.pathname.includes('system')) {
          navigate(`/system/settings`); //home
          return;
        }
        navigate(`/`); //home
      }
    }
    else {
      toast.error("incorect");
      dispatch(mfaSlice.actions.setUserSelectedImages([]))
      dispatch(mfaSlice.actions.setUserSelectedRelationType(''))
      getAuthenticationData();
      setCurrent(current - 1);
    }
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle  = {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: currentUser.role == 'user' ? '40%' : '50%',
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
          <Button
              type="link"
              onClick={() => dispatch(userSlice.actions.setForgotFactor('2fa'))}
            >
              Forgot 2FA?
            </Button>
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
              onClick={() => confirmRelationType()}
              // disabled={true}
              disabled={!userSelectedRelationType ? true : false}
            >
              Authenticate 
            </Button>
          )}
        </div>
        <OTP/>
      </div>
    );
}

export default MFA;