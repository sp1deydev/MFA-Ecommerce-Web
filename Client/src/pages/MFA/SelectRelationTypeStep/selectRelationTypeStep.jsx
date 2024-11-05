import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Select, Button  } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { UndoOutlined } from '@ant-design/icons';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import { toast } from 'react-toastify';
import { mfaSlice } from '../../../redux/mfaSlice';

const { Option } = Select;

function SelectRelationTypeStep(props) {
    const dispatch = useDispatch();
    const RelationTypes = useSelector(state => state.mfa.relationTypes)
    const randomSelectedRelationType = useSelector(state => state.mfa.randomSelectedRelationType)
    let options = []
    RelationTypes.map((relationType) => {
      options.push({title: relationType, value: relationType})
    })
    const [selectedRelationType, setSelectedRelationType] = useState()
    const [selectedImagesInfo, setSelectedImagesInfo] = useState(randomSelectedRelationType.images);


    const handleChange = (value) => {
        console.log(`Selected: ${value}`);
        setSelectedRelationType(value)
        dispatch(mfaSlice.actions.setUserSelectedRelationType(value));
      };
    return (
        <div className='padding-12'>
            <Select
              value={selectedRelationType}
              style={{ width: '100%', margin: '20px 0px' }}
              onChange={handleChange}
              placeholder="Select Relation Type"
            >
              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
            <Row gutter={[16, 16]}>
            {selectedImagesInfo.map((image) => (
              <Col span={12}>
                  <img
                    src={image.url}
                    alt={image.alt}
                    style={{
                      width: '280px',
                      height: '280px',
                      borderRadius: '4px',
                    }}
                  />
                </Col>
            ))}
            </Row>
        </div>
    );
}

export default SelectRelationTypeStep;