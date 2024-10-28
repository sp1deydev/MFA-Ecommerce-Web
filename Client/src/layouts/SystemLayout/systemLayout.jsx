import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Card, Row, Col } from 'antd';
import {
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import handleAuthToken from '../../utils/handleAuthToken';
import { handleSessionStorage } from '../../utils/handleSessionStorage';
import { userSlice } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const SystemLayout = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  const handleLogout = () => {
    navigate('/system/login');
    handleAuthToken();
    handleSessionStorage.remove('access_token');
    dispatch(userSlice.actions.removeCurrentUser());
    }
    
    const handleSystemSettings = () => {
        navigate('/system/settings');
    }
    const handleProfile = () => {
        navigate('/system/profile');
    }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme='light' collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" style={{ height: '32px', background: '#2412', margin: '16px' }}>System Administrator</div>
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<SettingOutlined />} onClick={handleSystemSettings}>
            System Settings
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />} onClick={handleProfile}>
            Profile
          </Menu.Item>
          <Menu.Item key="3" icon={<LogoutOutlined />} danger onClick={handleLogout}>
            Log out
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ backgroundColor:'#fff',padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Overview</Breadcrumb.Item>
          </Breadcrumb>
          <div>
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design Dashboard ©2024</Footer>
      </Layout>
    </Layout>
  );
};

export default SystemLayout;