import { Button, Modal } from 'antd';
import React, { FC, useState } from 'react'
import AddTransactionFrom from '../forms/AddTransactionForm';

const AddTransactionModal: FC = () => {

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
        <>
            <Button type="primary" onClick={showModal}>
                ADD TRANSACTION
            </Button>
            <Modal footer={null} title="ADD TRANSACTION" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <AddTransactionFrom/>
            </Modal>
        </>
    )
}

export default AddTransactionModal