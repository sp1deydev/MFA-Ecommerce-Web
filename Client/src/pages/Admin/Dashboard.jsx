import React from 'react';
import {
    Col, Row, Typography, Spin, Card, Empty, Table, Breadcrumb, BackTop
} from 'antd';
import {
    DashboardOutlined, HomeOutlined, ContactsTwoTone, ShopTwoTone, HddTwoTone, ShoppingTwoTone
} from '@ant-design/icons';
import {
    AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

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
    ];

    const data = [
        { name: 'Jan', Total: 30 },
        { name: 'Feb', Total: 20 },
        { name: 'Mar', Total: 50 },
        { name: 'Apr', Total: 40 },
        { name: 'May', Total: 60 },
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
                    <div style={{ marginTop: 20 }}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="">
                                <DashboardOutlined />
                                <span>DashBoard</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <Row gutter={12} style={{ marginTop: 20 }}>
                        <Col span={6}>
                            <Card bordered={false}>
                                <div className='statistic-card'>
                                    <div>
                                        <div className='number_total'>{statisticList.userTotal}</div>
                                        <div className='title_total'>Số thành viên</div>
                                    </div>
                                    <div>
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
                                        <div className='title_total'>Số sản phẩm</div>
                                    </div>
                                    <div>
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
                                        <div className='title_total'>Số danh mục</div>
                                    </div>
                                    <div>
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
                                        <div className='title_total'>Số đặt hàng</div>
                                    </div>
                                    <div>
                                        <ShoppingTwoTone style={{ fontSize: 48 }} />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={12}>
                            <div className="chart">
                                <div className="title">Thống kê đơn hàng trong 12 tháng</div>
                                <ResponsiveContainer width="100%" aspect={2 / 1}>
                                    <AreaChart
                                        width={730}
                                        height={250}
                                        data={data}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                    >
                                        <XAxis dataKey="name" stroke="gray" />
                                        <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                                        <Tooltip />
                                        <Area
                                            type="monotone"
                                            dataKey="Total"
                                            stroke="#8884d8"
                                            fillOpacity={1}
                                            fill="#8884d8"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className='chart'>
                                <div className="title">Đơn hàng mới nhất</div>
                                <div style={{ marginTop: 10 }}>
                                    <Table columns={columns} pagination={{ position: ['bottomCenter'] }} dataSource={order} />
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
