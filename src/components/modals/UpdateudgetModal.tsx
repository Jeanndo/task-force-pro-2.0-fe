'use client'
import React, { FC, useState } from 'react';
import { Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import UpdateBudgetForm from '../forms/UpdateBudgetForm';

type ModalProps = {
    setBudgetUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    amount: number;
    budgetId: string;
}
const UpdateBudgetModal: FC<ModalProps> = ({ setBudgetUpdated, amount, budgetId }) => {
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
                <UpdateBudgetForm
                    setIsModalOpen={setIsModalOpen}
                    setBudgetUpdated={setBudgetUpdated}
                    amount={amount}
                    budgetId={budgetId}
                />
            </Modal>
        </>
    );
};

export default UpdateBudgetModal;