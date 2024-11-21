import {
    ContactsTwoTone,
    HddTwoTone, ShoppingTwoTone,
    ShopTwoTone
} from '@ant-design/icons';
import {
    BackTop,
    Card,
    Col, Row,
    Spin,
    Table,
    Tag,
    Typography
} from 'antd';
import React, { useEffect, useState } from 'react';
import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { orderApi } from '../../api/orderApi';
import { vietnamCurrency } from '../../helpers/currency';
import { userApi } from '../../api/userApi';
import { categoryApi } from '../../api/categoryApi';
import { productApi } from '../../api/productApi';


const { Title } = Typography;

const Dashboard = () => {
    const [statisticList, setStatisticList] = useState({
        userTotal: 0,
        productTotal: 0,
        categoryTotal: 0,
        orderTotal: 0
    })
    console.log('list', statisticList)
    const statusColors = {
        pending: 'orange',
        completed: 'green',
        cancelled: 'red',
        delivered: 'blue',
      };
      const paymentMethodColors = {
        cod: 'purple',
        paypal: 'cyan',
      };
     const [purchaseOrders, setPurchaseOrders] = useState([]);
     const getData = async () => {
        try {
          const response = await orderApi.getAllOrders({limit: 3, order: 'desc'});
          const userCount = await userApi.getUserCount();
          const categoryCount = await categoryApi.getCategoryCount();
          const productCount = await productApi.getProductCount();
          setStatisticList({
            ...statisticList,
            productTotal:productCount.data.data,
            categoryTotal: categoryCount.data.data,
            orderTotal:response.data.meta.totalCount,
            userTotal:userCount.data.data
          });
          setPurchaseOrders(response.data.data);
        } catch (err) {}
      };
     const getUserCount = async () => {
        try {
        } catch (err) {}
      };
    
      useEffect(() => {
        getData();
      }, []);
    

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
        // { title: 'ID', dataIndex: '_id', key: '_id' },
        // { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'City', dataIndex: 'cityName', key: 'cityName' },
        { title: 'District', dataIndex: 'districtName', key: 'districtName' },
        { title: 'Ward', dataIndex: 'wardName', key: 'wardName' },
        { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice', 
            render: (totalPrice) => (
                <Tag color={'#3C3D37'}>{vietnamCurrency(totalPrice)}</Tag>
              ),
         },
        {
          title: 'Payment Method',
          dataIndex: 'paymentMethod',
          key: 'paymentMethod',
          render: (paymentMethod) => (
            <Tag color={paymentMethodColors[paymentMethod]}>{paymentMethod}</Tag>
          ),
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (status) => (
            <Tag color={statusColors[status]}>{status}</Tag>
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
                                <Table columns={columns} dataSource={purchaseOrders} pagination={false}/>
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
