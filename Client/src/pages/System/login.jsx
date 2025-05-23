import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Space, Checkbox, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userSlice } from '../../redux/userSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authApi } from '../../api/authApi';
import { handleLocalStorage } from '../../utils/handleLocalStorage';
import handleAuthToken from '../../utils/handleAuthToken';
import { handleSessionStorage } from '../../utils/handleSessionStorage';
import Loading from '../../components/loading';
import { mfaSlice } from '../../redux/mfaSlice';
import OTP from '../../components/OTP/otp';
import logo from '../../assets/image/whitelogo.png'

LoginSystem.propTypes = {
    
};

const { Text, Link } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};
  
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


function LoginSystem(props) {
    const navigate = useNavigate();
    const currentUser = useSelector((state)=> state.user.currentUser) || {};
    const isLoading = useSelector((state)=> state.user.isLoading)
    const systemConfiguration = useSelector((state) => state.mfa.systemConfiguration)
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
      if (Object.keys(currentUser).length !== 0 && searchParams.get('redirect') && systemConfiguration.id && currentUser.role == 'system') {
        if(currentUser.isConfig) {
          toast.info('Please authenticate 2nd factor authentication first')
          navigate(`${`/system/mfa-authentication?redirect=`}${searchParams.get('redirect')}`);
        }
        else {
          toast.info('Please config 2nd factor authentication first')
          navigate(`${`/system/mfa-configuration?redirect=`}${searchParams.get('redirect')}`);
        }
      }
      
      if (Object.keys(currentUser).length !== 0 && !searchParams.get('redirect') && systemConfiguration.id && currentUser.role == 'system') {
        if(currentUser.isConfig) {
          toast.info('Please authenticate 2nd factor authentication first')
          navigate(`/system/mfa-authentication`);
        }
        else {
          toast.info('Please config 2nd factor authentication first')
          navigate(`/system/mfa-configuration`);
        }
      }
    }, [currentUser, searchParams, navigate]);


      const onFinish = (values) => {
        form.validateFields().then(async (values) => {
          dispatch(userSlice.actions.setIsLoading(true))
          try {
            const res = await authApi.login(values);
            if (!res.data.success) {
              toast.error(res.data.message);
              form.resetFields();
              dispatch(userSlice.actions.setIsLoading(false))
              return;
            }
            
            const { user } = res.data;
            const currentUser = {
              id: user._id,
              username: user.username,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              role: user.role,
              isConfig: user.isConfig,
              createdAt: user.createdAt,
            };
            dispatch(userSlice.actions.setCurrentUser(currentUser));
            handleAuthToken(res.data.token);
            if(currentUser.role != 'system') {
              toast.error('Please use system account')
              form.resetFields();
            }
            if(values.remember) {
              handleLocalStorage.set('access_token', res.data.token);
            }
            handleSessionStorage.set('access_token', res.data.token);
            dispatch(userSlice.actions.setIsLoading(false))
            dispatch(mfaSlice.actions.setIsLoading(false))
            
            if (searchParams.get('redirect')) {
              navigate(searchParams.get('redirect'));
            } else {
              navigate('/system/settings');
            }
          } catch (error) {
            const errorMessage =
            error.response.data?.message ||
            'Có lỗi xảy ra phía máy chủ, vui lòng thử lại!';
            toast.error(errorMessage);
            dispatch(mfaSlice.actions.setIsLoading(false))
            dispatch(userSlice.actions.setIsLoading(false))
          }
            if(currentUser.role == 'system' && !isLoading) {
            if (searchParams.get('redirect')) {
              if(currentUser.isConfig) {
                toast.info('Please authenticate 2nd factor authentication first')
                navigate(`${`/system/mfa-authentication?redirect=`}${searchParams.get('redirect')}`);
              }
              else {
                toast.info('Please config 2nd factor authentication first')
                navigate(`${`/system/mfa-configuration?redirect=`}${searchParams.get('redirect')}`);
              }
            } else {
              if(currentUser.isConfig) {
                toast.info('Please authenticate 2nd factor authentication first')
                navigate(`/system/mfa-authentication`);
              }
              else {
                toast.info('Please config 2nd factor authentication first')
                navigate(`/system/mfa-configuration`);
              }
            }
          }
          

      }).catch((err) => {
            // form validation failed
            console.log(err)
        })
      };

    

    return (
      <div className="form-container">
        <div className="sub-form-container">
        <div
          className="logo"
          style={{ width: "100%",textAlign: 'center', margin:'-20px 0px 0px 8px' }}
        >
          <img
            src={logo} // Replace with your logo image path
            alt="Logo"
            style={{
              width: "200px",
              margin:'8px'
            }}
          />
        </div>
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true }]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, min: 6 }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

           <Form.Item
              style={{
                marginLeft: "63%",
                width: "700px",
              }}
            >
              <Link
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                  lineHeight: "32px",
                  margin: "0px 0px 0px 8px",
                }}
                onClick={() => dispatch(userSlice.actions.setForgotFactor('password'))}
              >
                Forgot Password?
              </Link>
            </Form.Item>

            <Form.Item {...tailLayout}  style={{
                marginLeft: "30%",
                width:'fit-content',
                marginTop: "-54px",
              }}>
                <Button type="primary" htmlType="submit">
                  {isLoading && <Loading color="#fff" bgColor="#1677ff" />}
                  Login
                </Button>
            </Form.Item>
          </Form>
        </div>
        <OTP/>
      </div>
    );
}

export default LoginSystem;