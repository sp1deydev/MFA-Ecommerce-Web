import React, { useState, Fragment  } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import logo from '../assets/image/bluelogo.png'
import { 
    HomeOutlined, 
    InfoCircleOutlined,
    UserOutlined,
    LogoutOutlined,
    LoginOutlined,
    UserAddOutlined,
    SmileOutlined,
    FrownOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { userSlice } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { handleLocalStorage } from '../utils/handleLocalStorage';
import handleAuthToken from '../utils/handleAuthToken';
import { toast } from 'react-toastify';
import { handleSessionStorage } from '../utils/handleSessionStorage';
import { Typography } from 'antd';

const { Text } = Typography;

HeaderBar.propTypes = {
    
};

const { Header } = Layout;

function HeaderBar(props) {
    const currentUser = useSelector((state) => state.user.currentUser) || {};
    const isEmpty =  Object.keys(currentUser).length === 0;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleHome = () => {
       navigate('/home');  
    }
    const handleAbout = () => {
       navigate('/about');  
    }
    const handleCart = () => {
       navigate('/cart');  
    }
    const handleLogin = () => {
       navigate('/login');  
    }
    const handleRegister = () => {
       navigate('/register');  
    }
    const handleProfile = () => {
       navigate(`/userInfo/${currentUser.id}`);  
    }
    const handleLogout = () => {
        handleAuthToken();
        handleLocalStorage.remove('access_token');
        handleSessionStorage.remove('access_token');
        dispatch(userSlice.actions.removeCurrentUser());
        navigate('/home');
    }

    //declare menuItems to by pass children warning
    const menuItems = [
        {
          key: '1',
          icon: <HomeOutlined style={{ color: '#fff' }} />,
          label: 'Home',
          onClick: handleHome,
          style: { color: '#fff' },
        },
        {
          key: '2',
          icon: <InfoCircleOutlined style={{ color: '#fff' }} />,
          label: 'About',
          onClick: handleAbout,
          style: { color: '#fff' },
        },
        {
          key: '8',
          icon: <ShoppingCartOutlined style={{ color: '#fff' }} />,
          label: 'Cart',
          onClick: handleCart,
          style: { color: '#fff' },
        },
        {
          key: '3',
          icon: currentUser && !isEmpty ? (
            <SmileOutlined style={{ color: '#fff' }} />
          ) : (
            <FrownOutlined style={{ color: '#fff' }} />
          ),
          label: currentUser && !isEmpty ? (
            <span style={{ color: '#fff' }}>Username</span>
          ) : (
            <span style={{ color: '#fff' }}>Guest</span>
          ),
          style: { color: '#fff' },
          children: currentUser && !isEmpty
            ? [
                {
                  key: '4',
                  icon: <UserOutlined />,
                  label: 'My Profile',
                  onClick: handleProfile,
                },
                {
                  key: '5',
                  icon: <LogoutOutlined />,
                  label: 'Log Out',
                  onClick: handleLogout,
                },
              ]
            : [
                {
                  key: '6',
                  icon: <LoginOutlined />,
                  label: 'Login',
                  onClick: handleLogin,
                },
                {
                  key: '7',
                  icon: <UserAddOutlined />,
                  label: 'Register',
                  onClick: handleRegister,
                },
              ],
        },
      ];
      
    return (
      <Header
        style={{
          background: "#0066CC",
          color: "#fff",
          position: "fixed",
          zIndex: 1000,
          width: "100vw",
          top: 0,
        }}
      >
        <div
          className="logo"
          style={{ width: "200px", float: "left", }}
        >
          <img
            src={logo} // Replace with your logo image path
            alt="Logo"
            style={{
              width: "200px",
              marginTop:'8px'
            }}
          />
        </div>

        <Menu
          mode="horizontal"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            background: "#0066CC",
            color: "#fff",
          }}
          items={menuItems}
        />
      </Header>
    );
}

export default HeaderBar;