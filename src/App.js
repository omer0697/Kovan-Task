import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomTable from './components/CustomTable';
import { Button, Input, Modal, Select } from 'antd';
import DialogMenu from './components/Modal';
import { ReloadOutlined } from '@ant-design/icons';

const vehicleTypes = ['bike', 'scooter'];

function App() {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterBikeId, setFilterBikeId] = useState('');
  const [filterVehicleType, setFilterVehicleType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ttl, setTtl] = useState(false);
  const [countData, setCountData] = useState(0);
  const [modelData, setModelData] = useState({
    "bike_id": '',
    "lat": '',
    "lon": '',
    "is_reserved": "",
    "is_disabled": "",
    "vehicle_type": "",
    "total_bookings": "",
    "android": "",
    "ios": "",
  });
  const [modelVisible, setModelVisible] = useState(false);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://test-api-a1g.pages.dev/items?page=${page}`);
      setCountData(response.data.total_count);
      setTtl(response.data.ttl);
      const newData = response.data.data.bikes;
      setData(prevData => [...prevData, ...newData]);
      setTableData(prevData => [...prevData, ...newData]);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.ttl) {
      const interval = setInterval(() => {
        fetchData(1); // Reset to the first page for the interval fetch
      }, ttl * 1000);
      return () => clearInterval(interval);
    }
  }, [ttl]);

  useEffect(() => {
    let filtered = data;

    if (filterBikeId) {
      filtered = filtered.filter(item => item && item.bike_id && item.bike_id.includes(filterBikeId));
    }

    if (filterVehicleType) {
      filtered = filtered.filter(item => item && item.vehicle_type && item.vehicle_type === filterVehicleType);
    }

    setTableData(filtered);
  }, [filterBikeId, filterVehicleType, data]);

  const handleShowMore = () => {
    fetchData(currentPage + 1);
  };

  const columns = [
    {
      title: 'Bike ID',
      dataIndex: 'bike_id',
      key: 'bike_id',
      width: 140,
      render: (text) => <a>{text ?? 'N/A'}</a>,
    },
    {
      title: 'Vehicle Type',
      dataIndex: 'vehicle_type',
      key: 'vehicle_type',
      width: 140,
      render: (text) => <a>{text ?? 'N/A'}</a>,
    },
    {
      title: 'Details',
      key: 'details',
      render: (text, record) => (
        <Button type="primary" onClick={
          () => showModel(record)
        }>
          Details
        </Button>
      ),
      width: 120,
    },
  ];

  function showModel(record) {
    setModelData(record);
    setModelVisible(true);
  }

  async function reloudData() {
    setLoading(true);
    try {
      const response = await axios.get(`https://test-api-a1g.pages.dev/items?page=1`);
      setCountData(response.data.total_count);
      setTtl(response.data.ttl);
      const newData = response.data.data.bikes;
      setData(newData);
      setTableData(newData);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col px-32">
      <div className='flex w-96 items-center justify-between gap-4 py-10'>
        <DialogMenu
          modelData={modelData}
          modelVisible={modelVisible}
          setModelVisible={setModelVisible}
        />
        <Input 
          placeholder='Filter by Bike ID'
          value={filterBikeId}
          onChange={(e) => setFilterBikeId(e.target.value)}
        />
        <Select 
          placeholder='Filter by Vehicle Type'
          style={{ width: 200 }}
          value={filterVehicleType}
          onChange={(value) => setFilterVehicleType(value)}
          // Allow clearing the selected value
          allowClear
        >
          {vehicleTypes.map((type) => (
            <Select.Option key={type} value={type}>
              {type}
            </Select.Option>
          ))}
        </Select>
      </div>
      <Button
        className='w-44' 
        type="primary"
        onClick={() => reloudData()}
        icon={<ReloadOutlined className='pl-2'/>}
        iconPosition='left'
        loading={loading}
      >
        Reload Data
      </Button>
      <CustomTable 
        data={tableData}
        columns={columns} 
        countData={countData}
        loading={loading}
        handleShowMore={handleShowMore}
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
      />
    </div>
  );
}

export default App;
