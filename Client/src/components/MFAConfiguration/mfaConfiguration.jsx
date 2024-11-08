import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, message, Steps, theme } from 'antd';
import './style.css';
import { RightOutlined, LeftOutlined, CheckOutlined } from '@ant-design/icons';
import UploadImage from '../uploadImage';
import RelationTypes from '../relationTypes';
import EstablishRelationTypes from '../establishRelationTypes';
import { useDispatch, useSelector } from 'react-redux';
import { mfaSlice } from '../../redux/mfaSlice';
import { systemApi } from '../../api/systemApi';
import { toast } from 'react-toastify';
import { authApi } from '../../api/authApi';
import { userSlice } from '../../redux/userSlice';
import { userApi } from '../../api/userApi';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    const handleSystemConfig = async () => {
      try {
        const systemConfig = await systemApi.getSystemConfig();
        dispatch(mfaSlice.actions.setSystemConfiguration(systemConfig.data.data));
      } catch (err) {
        toast.error(err.response.data.message || "Get System Configuration Error");
      }
    }
    handleSystemConfig();
  }, []);
const { token } = theme.useToken();
const [current, setCurrent] = useState(0);
const systemConfig = useSelector(state => state.mfa.systemConfiguration)
const imageList = useSelector(state => state.mfa.imageList)
const relationTypes = useSelector(state => state.mfa.relationTypes)
const relationships = useSelector(state => state.mfa.relationships)
const currentUser = useSelector(state => state.user.currentUser)
const isLoading = useSelector(state => state.user.isLoading)
const isAuthenticated2FA = useSelector((state)=> state.user.isAuthenticated2FA);
  useEffect(() => {
      if (!currentUser.isMFA && window.location.pathname.includes('forgot')) {
        console.log('here')
        if(currentUser.role == 'system') {
        navigate(`/system/mfa-authentication`); //home
        
      }
      }
      if(!currentUser.isMFA && currentUser.isConfig) {
        toast.warn(`You have to authenticate 2FA before and go to Profile to config 2FA`)
        if (window.location.pathname.includes('admin')) {
          navigate(`/admin/mfa-authentication`);
        } else if (window.location.pathname.includes('system')) {
          navigate(`/system/mfa-authentication`);
        } else {
          navigate(`/mfa-authentication`);
        }
      }
  }, [currentUser.isMFA, currentUser.isConfig, navigate])

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

  const handleSaveConfig = async () => {
    try {
      const payload = {
        isConfig: true,
        images: imageList,
        relationships: relationships,
        relationtypes: relationTypes,
      }
      console.log(payload);
      console.log('test1',currentUser);
      const res = await userApi.config(payload);
      if (!res.data.success) {
        toast.error(res.data.message);
        dispatch(userSlice.actions.setIsLoading(false))
        return;
      }
      
      toast.success(res.data.message);
      dispatch(userSlice.actions.setIsLoading(false))
      let newCurrentUser = {...currentUser}
      newCurrentUser.isConfig = true;
      newCurrentUser.isMFA = false;
      dispatch(userSlice.actions.setCurrentUser(newCurrentUser))
      console.log('test',newCurrentUser)
        const newData = await userApi.getConfig();
        if (!newData.data.success) {
          toast.error(newData.data.message);
          dispatch(userSlice.actions.setIsLoading(false))
          return;
        }
        toast.success(newData.data.message);
        
      //   console.log(currentUser)
      //   if (searchParams.get('redirect')) {
      //     navigate(`${searchParams.get('redirect')}`);
      //   }
      //   else {
      //     if(window.location.pathname.includes('system')) {
      //     navigate(`/system/mfa-authentication`); //home
          
      //   }
      //   else {
      //     navigate(`/mfa-authentication`); //home
      //   }
      // }
      // if (!isLoading && window.location.pathname.includes('forgot')) {
      //   console.log('here')
      //   if(currentUser.role == 'system') {
      //   navigate(`/system/mfa-authentication`); //home
        
      // }
      // else {
      //   navigate(`/mfa-authentication`); //home
      // }
      // }
      dispatch(mfaSlice.actions.setImageList(newData.data.result.images))
      dispatch(mfaSlice.actions.setRelationTypes(newData.data.result.relationtypes))
      dispatch(mfaSlice.actions.setRelationships(newData.data.result.relationships))


    } catch (error) {
      const errorMessage =
      error.response.data?.message ||
      'Có lỗi xảy ra phía máy chủ, vui lòng thử lại!';
      toast.error(errorMessage);
      dispatch(userSlice.actions.setIsLoading(false))
    }
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle  = {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: currentUser.role == 'user' ? '30%' : '40%',
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
          {currentUser.isConfig && !window.location.pathname.includes('forgot') ?
        <Button style={{ margin: "0 8px" }} onClick={() => navigate(-1)} 
        // icon={<LeftOutlined />}
        >
              Back to Profile
            </Button>
            :
            ""  
        }
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
              onClick={() => handleSaveConfig()}
              // disabled={true}
              disabled={relationshipsCondition(imageList, relationships) == false ? true : false}
            >
              {currentUser.isConfig ? "Change 2FA": "Register"} 
            </Button>
          )}
        </div>
      </div>
    );
}

export default MFAConfiguration;