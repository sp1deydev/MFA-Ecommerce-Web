import React, { useEffect, useState } from "react";
import { Row, Col, Card, Tag, Typography, Button, Divider, Flex, Checkbox, Pagination, Empty } from "antd";
import ProductCard from "../../components/productCard/productCard";
import { productSlice } from "../../redux/productSlice";
import { productApi } from "../../api/productApi";
import { useDispatch } from "react-redux";
import { categoryApi } from "../../api/categoryApi";

const { Text, Title } = Typography;

function Product() {
    const [products, setProducts] = useState([]);
    const [productCount, setProductCount] = useState();
    const [categories, setCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [selectedOS, setSelectedOS] = useState([]);
    const [selectedConnections, setSelectedConnections] = useState([]);
    const dispatch = useDispatch();

    const priceOptions = [
        "All",
        "0 - 1.000.000 VND",
        "1.000.000 - 5.000.000 VND",
        "5.000.000 - 10.000.000 VND",
        "Upper 10.000.000+ VND"
    ];
    const osOptions = ["All","Android", "iOS"];
    const connectionOptions = ["All","Wi-Fi", "Bluetooth", "NFC"];

    const handleCheckboxChange = (type, checkedValues) => {
        if (type === "price") setSelectedPrices(checkedValues);
        if (type === "os") setSelectedOS(checkedValues);
        if (type === "connection") setSelectedConnections(checkedValues);
    };

    const handleChangePage = async (page, pageSize) => {
        const res = await productApi.getAllProducts({ order: 'desc', limit: 8, page: page});
        setProducts(res.data.data);
    }

    const getAllCategories = async () => {
        try {
            const response = await categoryApi.getAllCategories();
            setCategories(response.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const getAllProducts = async () => {
        try {
            const response = await productApi.getAllProducts();
            const res = await productApi.getAllProducts({ order: 'desc', limit: 8 });
            setProducts(res.data.data);
            setProductCount(response.data.meta.totalCount)
            dispatch(productSlice.actions.setProductList(response.data.data));
        } catch (err) {
            console.error(err);
        }
    };
    const handleChange = async (name, checked) => {
        const nextSelectedTags = checked
            ? [...selectedTags, name]
            : selectedTags.filter((t) => t !== name);
        if(nextSelectedTags.length > 0) {
            const res = await productApi.getAllProducts({ order: 'desc', limit: 8, categories: nextSelectedTags.join(',') });
            const response = await productApi.getAllProducts({categories: nextSelectedTags.join(',')});
            setProducts(res.data.data);
            setProductCount(response.data.meta.totalCount)
            dispatch(productSlice.actions.setProductList(response.data.data));
        }
        else {
            getAllProducts();
        }
        setSelectedTags(nextSelectedTags);
    };


    useEffect(() => {
        getAllProducts();
        getAllCategories();
    }, []);

    return (
        <div style={{ backgroundColor: '#f3f4f6', padding: '0px 0px 24px 0px' }}>
            <div className="sub-container-1">
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{
                        minHeight: '580px',
                        height:'fit-content',
                        maxWidth: '260px',
                        backgroundColor: '#fff',
                        border: '1px solid #2412',
                        borderRadius: '8px',
                        padding: '12px',
                    }}>
                        <Flex gap={4} wrap align="center">
                            <Title level={4}>Categories</Title>
                            <div>
                                {categories.map((category) => (
                                    <Tag.CheckableTag
                                        style={{
                                            fontSize: '14px',
                                            padding: '4px 8px',
                                            marginBottom: '8px',
                                        }}
                                        key={category._id}
                                        checked={selectedTags.includes(category.name)}
                                        onChange={(checked) => handleChange(category.name, checked)}
                                    >
                                        {category.name}
                                    </Tag.CheckableTag>
                                ))}
                            </div>
                        </Flex>
                        <Divider />
                        <Title level={4}>Price</Title>
                        <Checkbox.Group
                            options={priceOptions}
                            value={selectedPrices}
                            onChange={(checkedValues) => handleCheckboxChange("price", checkedValues)}
                        />
                        <Divider />
                        <Title level={4}>Operating System</Title>
                        <Checkbox.Group
                            options={osOptions}
                            value={selectedOS}
                            onChange={(checkedValues) => handleCheckboxChange("os", checkedValues)}
                        />
                        <Divider />
                        <Title level={4}>Connection</Title>
                        <Checkbox.Group
                            options={connectionOptions}
                            value={selectedConnections}
                            onChange={(checkedValues) => handleCheckboxChange("connection", checkedValues)}
                        />
                    </div>
                    <Row gutter={[8, 8]} style={{minWidth:'976px'}}>
                        {!products.length ? 
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{margin: 'auto'}}/> 
                            :
                            (products.map((product, index) => (
                                <Col key={index} span={6}>
                                    <ProductCard product={product} />
                                </Col>
                            )))
                        }
                        <div style={{width:'100%', marginTop:'12px'}}>
                            <Pagination align="center" onChange={handleChangePage} defaultCurrent={1} pageSize={8} total={productCount} />
                        </div>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default Product;
