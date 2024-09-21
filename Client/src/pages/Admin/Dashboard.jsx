import React from 'react';
import { Layout, Menu, Breadcrumb, Card, Row, Col } from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Dashboard extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme='light' collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" style={{ height: '32px', background: '#2412', margin: '16px' }}>Admin</div>
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Product
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User Management">
              <Menu.Item key="3">Users</Menu.Item>
              <Menu.Item key="4">Roles</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Teams">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Category
            </Menu.Item>
            <Menu.Item key="10" icon={<FileOutlined />}>
              Purchase Order
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
            <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
              <Row gutter={16}>
                <Col span={8}>
                  <Card title="Card 1" bordered={false}>
                    Card content
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Card 2" bordered={false}>
                    Card content
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Card 3" bordered={false}>
                    Card content
                  </Card>
                </Col>
              </Row>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design Dashboard ©2024</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
