import React, { useState } from 'react';
import { Avatar, List, Input, Button, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { mfaSlice } from '../../redux/mfaSlice';
import { toast } from 'react-toastify';
import logo from '../../assets/image/bluesquarelogo.png'

const RelationTypes = () => {
  const dispatch = useDispatch();
  const [inputRelationTypesValue, setInputRelationTypesValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null); // To track which item is being edited
  const [editedValue, setEditedValue] = useState(''); // To track the new edited value
  const RelationTypes = useSelector((state) => state.mfa.relationTypes);
  const systemConfig = useSelector((state) => state.mfa.systemConfiguration);
  let displayRelationTypes = []
  RelationTypes.map((relationType) => {
    displayRelationTypes.push({title: relationType, value: relationType})
  })

  const textColor = RelationTypes.length >= systemConfig.numOfRelationTypes ? 'success-text' : 'error-text';

  // Handle input change for new item
  const handleInputChange = (e) => {
    setInputRelationTypesValue(e.target.value);
  };

  // Handle input change for editing item
  const handleEditInputChange = (e) => {
    setEditedValue(e.target.value);
  };

  // Handle adding a new relation type
  const handleButtonClick = () => {
    if (!inputRelationTypesValue) {
      toast.error('Please input relation type');
      return;
    }
    const newRelationTypes = [...RelationTypes];
    newRelationTypes.push(inputRelationTypesValue);
    dispatch(mfaSlice.actions.setRelationTypes(newRelationTypes));
    setInputRelationTypesValue('');
  };

  // Handle clicking edit button
  const handleEdit = (index, title) => {
    setEditingIndex(index);
    setEditedValue(title);
  };

  // Handle saving the edited value
  const handleSave = (index) => {
    let updatedRelationTypes = [...RelationTypes];
    updatedRelationTypes[index] = editedValue;
    dispatch(mfaSlice.actions.setRelationTypes(updatedRelationTypes));
    setEditingIndex(null); // Exit edit mode
    message.success('Item updated successfully');
  };
  const handleCancel = (index) => {
    setEditingIndex(null)
  };

  // Handle delete action
  const handleDelete = (index) => {
    const updatedRelationTypes = RelationTypes.filter((_, i) => i !== index);
    dispatch(mfaSlice.actions.setRelationTypes(updatedRelationTypes));
    message.info('Item deleted successfully');
  };

  return (
    <div className='padding-12'>
      <div style={{ margin: '20px', textAlign: 'center' }}>
        <Input
          placeholder="Nhập vào đây..."
          value={inputRelationTypesValue}
          onChange={handleInputChange}
          style={{ width: 200, marginRight: 10 }}
        />
        <Button
          type="default"
          onClick={handleButtonClick}
          icon={<PlusOutlined />}
        >
          Add
        </Button>
      </div>
    <div className='text-center'>Add at least {systemConfig.numOfRelationTypes} Relation Types</div>
    <div className={`${textColor} text-center`}>
        {RelationTypes.length}/{systemConfig.numOfRelationTypes}
    </div>
      <List
        pagination={{ position: 'bottom', align: 'center' }}
        dataSource={displayRelationTypes}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              editingIndex === index ? (
                <span>
                  <Button
                    type="text"
                    icon={<CheckOutlined />}
                    onClick={() => handleSave(index)}
                    style={{ color: '#0066CC' }}
                  />
                  <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={() => handleCancel(index)}
                    style={{ color: '#aaaa' }}
                  />
                </span>
              ) : (
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(index, item.title)}
                  style={{ color: '#0066CC' }}
                />
              ),
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(index)}
                danger
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={logo} />}
              title={
                editingIndex === index ? (
                  <Input value={editedValue} onChange={handleEditInputChange} />
                ) : (
                  <a href="https://ant.design">{item.title}</a>
                )
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default RelationTypes;
