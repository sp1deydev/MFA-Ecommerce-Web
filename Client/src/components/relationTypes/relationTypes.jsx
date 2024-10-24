import React, { useState } from 'react';
import { Avatar, List, Radio, Space, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { mfaSlice } from '../../redux/mfaSlice';
import { toast } from 'react-toastify';


const RelationTypes = () => {
  const dispatch = useDispatch();
  const [inputRelationTypesValue, setInputRelationTypesValue] = useState('');
  const RelationTypes = useSelector((state) => state.mfa.relationTypes)
  // Hàm xử lý khi input thay đổi
  const handleInputChange = (e) => {
    setInputRelationTypesValue(e.target.value);
  };

  // Hàm xử lý khi nhấn nút
  const handleButtonClick = () => {
    if(!inputRelationTypesValue) {
      toast.error('Please input relation type');
      return;
    }
    let newRelationTypes = [...RelationTypes]
    newRelationTypes.push({title: inputRelationTypesValue})
    dispatch(mfaSlice.actions.setRelationTypes(newRelationTypes));
    setInputRelationTypesValue('')
  };

  return (
    <div className='padding-12'>
      <div style={{ margin: '20px', textAlign: 'center' }}>
        <Input 
          placeholder="Nhập vào đây..." 
          value={inputRelationTypesValue} 
          onChange={handleInputChange} 
          style={{ width: 300, marginRight: 10 }}
        />
        <Button 
        type="default"
         onClick={handleButtonClick}
         icon={<PlusOutlined />}
        >
          Add
        </Button>
      </div>
      <List
        pagination={{ position: 'bottom', align: 'center' }}
        dataSource={RelationTypes}
        renderItem={(item, index) => (
          <List.Item  actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">delete</a>]}
          >
            <List.Item.Meta
              avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
              title={<a href="https://ant.design">{item.title}</a>}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default RelationTypes;