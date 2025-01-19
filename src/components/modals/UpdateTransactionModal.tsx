'use client'
import React, { FC, useState } from 'react';
import { Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import UpdateTransactionForm from '../forms/UpdateTransactionForm';

type ModalProps = {
    setTransactionUpdated: React.Dispatch<React.SetStateAction<boolean>>
    transactionId: string;
    accountId: string;
    categoryId: string;
    amount: number;
    type: string;
    description: string;
}
const UpdateTransactionModal: FC<ModalProps> = ({ setTransactionUpdated, transactionId, accountId, categoryId, amount, type, description }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
            <span className="cursor-pointer text-blue-500" onClick={showModal}><EditOutlined /></span>
            <Modal footer={null} title="UPDATE TRANSACTION" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <UpdateTransactionForm
                    setIsModalOpen={setIsModalOpen}
                    setTransactionUpdated={setTransactionUpdated}
                    transactionId={transactionId}
                    accountId={accountId}
                    categoryId={categoryId}
                    amount={amount}
                    type={type}
                    description={description}
                />
            </Modal>
        </>
    );
};

export default UpdateTransactionModal;