import {Modal} from "antd";
import CustomTable from "./CustomTable";

export default function DialogMenu({modelData, modelVisible, setModelVisible}) {

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
            title: 'latitude',
            dataIndex: 'lat',
            key: 'lat',
            width: 140,
            render: (text) => <a>{text ?? 'N/A'}</a>,
        },
        {
            title: 'longitude',
            dataIndex: 'lon',
            key: 'lon',
            width: 140,
            render: (text) => <a>{text ?? 'N/A'}</a>,
        },
        {
            title: 'is_reserved',
            dataIndex: 'is_reserved',
            key: 'is_reserved',
            width: 140,
            render: (text) => <a>{text ?? 'N/A'}</a>,
        },
        {
            title: 'is_disabled',
            dataIndex: 'is_disabled',
            key: 'is_disabled',
            width: 140,
            render: (text) => <a>{text ?? 'N/A'}</a>,
        },
    ];

    return (
        <Modal
            title="Details"
            open={modelVisible}
            onOk={() => setModelVisible(false)}
            onCancel={() => setModelVisible(false)}
            className="w-full flex justify-center"
        >
            <CustomTable 
                data={[modelData]}
                columns={columns} 
            />
        </Modal>
    );
}