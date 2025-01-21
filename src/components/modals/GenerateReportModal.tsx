import { Button, Modal } from 'antd';
import React, { FC, useState } from 'react'
import { FileExcelOutlined } from '@ant-design/icons';
import GenerateReportForm from '../forms/GenerateReportForm';


const GenerateReportModal: FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Button className="!bg-green-500" onClick={showModal} type="primary" icon={<FileExcelOutlined />}>Export</Button>

            <Modal title="TRANSACTIONS REPORT" footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <GenerateReportForm />
            </Modal>
        </div>
    )
}

export default GenerateReportModal
