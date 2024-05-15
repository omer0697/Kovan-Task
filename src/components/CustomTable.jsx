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
        // show countData in the footer of the table
        footer={() => {
            if (handleShowMore){
                return (
                    <div className='flex flex-col'>
                        <p>Total number of bikes: {countData}</p>
                        <Button 
                            type="dashed"
                            onClick={handleShowMore}
                        >
                            Show More
                        </Button>
                    </div>
                );
            }
        }}
        {...props}     
    />
    </div>
  );
}