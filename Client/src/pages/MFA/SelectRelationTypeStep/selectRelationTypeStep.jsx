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
    const options = useSelector(state => state.mfa.relationTypes)
    const [selectedRelationType, setSelectedRelationType] = useState()
    const [selectedImagesInfo, setSelectedImagesInfo] = useState([
        {
            "uid": "rc-upload-1730085909393-2",
            "name": "1730085912346-275097726_354306753276397_3570733209895545930_n.jpg",
            "status": "done",
            "url": "http://localhost:3001/uploads\\1730085912346-275097726_354306753276397_3570733209895545930_n.jpg"
        },
        {
            "uid": "rc-upload-1730085909393-4",
            "name": "1730085914666-399405994_904004437962999_8837288258346405781_n.jpg",
            "status": "done",
            "url": "http://localhost:3001/uploads\\1730085914666-399405994_904004437962999_8837288258346405781_n.jpg"
        },
    ]);


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