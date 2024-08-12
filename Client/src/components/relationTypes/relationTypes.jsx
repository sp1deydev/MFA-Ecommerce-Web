import React, { useState } from 'react';
import { Avatar, List, Radio, Space } from 'antd';


const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];


const RelationTypes = () => {

  return (
    <>
      <List
        pagination={{ position: 'bottom', align: 'center' }}
        dataSource={data}
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
    </>
  );
};

export default RelationTypes;