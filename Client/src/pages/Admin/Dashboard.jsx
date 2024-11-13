import React from 'react';
import {
    Col, Row, Typography, Spin, Card, Empty, Table, Breadcrumb, BackTop
} from 'antd';
import {
    DashboardOutlined, HomeOutlined, ContactsTwoTone, ShopTwoTone, HddTwoTone, ShoppingTwoTone
} from '@ant-design/icons';
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';


const { Title } = Typography;

const Dashboard = () => {
    const statisticList = {
        userTotal: 150,
        productTotal: 200,
        categoryTotal: 20,
        orderTotal: 120
    };

    const order = [
        {
            key: '1',
            user: { username: 'John Doe', email: 'john@example.com' },
            orderTotal: '100.00',
            billing: 'Credit Card',
            status: 'Pending',
        },
        {
            key: '2',
            user: { username: 'Jane Smith', email: 'jane@example.com' },
            orderTotal: '250.00',
            billing: 'PayPal',
            status: 'Completed',
        },
        {
            key: '3',
            user: { username: 'Jane Smith', email: 'jane@example.com' },
            orderTotal: '250.00',
            billing: 'PayPal',
            status: 'Completed',
        },
        {
            key: '4',
            user: { username: 'Jane Smith', email: 'jane@example.com' },
            orderTotal: '250.00',
            billing: 'PayPal',
            status: 'Completed',
        },
        {
            key: '5',
            user: { username: 'Jane Smith', email: 'jane@example.com' },
            orderTotal: '250.00',
            billing: 'PayPal',
            status: 'Completed',
        },
        {
            key: '6',
            user: { username: 'Jane Smith', email: 'jane@example.com' },
            orderTotal: '250.00',
            billing: 'PayPal',
            status: 'Completed',
        },
        {
            key: '7',
            user: { username: 'Jane Smith', email: 'jane@example.com' },
            orderTotal: '250.00',
            billing: 'PayPal',
            status: 'Completed',
        },
    ];

    const data = [
        { name: 'Jan', total: 30 },
        { name: 'Feb', total: 20 },
        { name: 'Mar', total: 50 },
        { name: 'Apr', total: 40 },
        { name: 'May', total: 60 },
        { name: 'Jun', total: 70 },
        { name: 'Jul', total: 55 },
        { name: 'Aug', total: 65 },
        { name: 'Sep', total: 45 },
        { name: 'Oct', total: 35 },
        { name: 'Nov', total: 25 },
        { name: 'Dec', total: 75 },
    ];

    const columns = [
        {
            title: 'ID',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tên',
            dataIndex: 'user',
            key: 'user',
            render: (text) => <a>{text.username}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'user',
            key: 'user',
            render: (text) => <a>{text.email}</a>,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'orderTotal',
            key: 'orderTotal',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Hình thức thanh toán',
            dataIndex: 'billing',
            key: 'billing',
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            render: (slugs) => (
                <span>
                    <span key={slugs}>
                        {slugs?.toUpperCase()}
                    </span>
                </span>
            ),
        },
    ];

    return (
        <div>
            <Spin spinning={false}>
                <div className='container'>
                    <Row gutter={12} style={{ marginTop: 20 }}>
                        <Col span={6}>
                            <Card bordered={false}>
                                <div className='statistic-card'>
                                    <div>
                                        <div className='number_total'>{statisticList.userTotal}</div>
                                        <div className='title_total'>Users</div>
                                    </div>
                                    <div style={{alignSelf:'center'}}>
                                        <ContactsTwoTone style={{ fontSize: 48 }} />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card bordered={false}>
                                <div className='statistic-card'>
                                    <div>
                                        <div className='number_total'>{statisticList.productTotal}</div>
                                        <div className='title_total'>Products</div>
                                    </div>
                                    <div style={{alignSelf:'center'}}>
                                        <ShopTwoTone style={{ fontSize: 48 }} />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card bordered={false}>
                                <div className='statistic-card'>
                                    <div>
                                        <div className='number_total'>{statisticList.categoryTotal}</div>
                                        <div className='title_total'>Categories</div>
                                    </div>
                                    <div style={{alignSelf:'center'}}>
                                        <HddTwoTone style={{ fontSize: 48 }} />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card bordered={false}>
                                <div className='statistic-card'>
                                    <div>
                                        <div className='number_total'>{statisticList.orderTotal}</div>
                                        <div className='title_total'>Purchase Orders</div>
                                    </div>
                                    <div style={{alignSelf:'center'}}>
                                        <ShoppingTwoTone style={{ fontSize: 48 }} />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={12} style={{marginTop: '40px'}}>
                        <Col span={12}>
                            <div className="chart">
                                <Typography.Title level={4}>Statistic in 12 months</Typography.Title>
                                <ResponsiveContainer width="100%" aspect={2 / 1}>
                                    <ComposedChart
                                    width={730}
                                    height={250}
                                    data={data}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                    >
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="total" barSize={20} fill="#413ea0" />
                                    <Line type="monotone" dataKey="total" stroke="#ff7300" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className='chart'>
                                <Typography.Title level={4}>Newest Purchase Orders</Typography.Title>
                                <div style={{ marginTop: 10 }}>
                                    <Table columns={columns} 
                                      pagination={{
                                        pageSize: 3,
                                        position: ['bottomCenter']
                                      }}
                                    dataSource={order} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div >
    )
}

export default Dashboard;
