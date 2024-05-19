import React from 'react';
import { Divider, Table, Button } from 'antd';
  
export default function CustomTable({ data, columns, countData, handleShowMore, ...props }) {
  return (
    <div>
      <Divider orientation="left">Bikes</Divider>
      <Table 
        dataSource={data} 
        columns={columns} 
        style={{ width: '100%' }}
        pagination={false}
        {...props}     
    />
    </div>
  );
}