'use client'
import { Button, Modal } from 'antd';
import React, { FC, useState } from 'react'
import SetBudgetForm from '../forms/SetBudgetForm';

type ModalProps = {
    setBudgetAdded: React.Dispatch<React.SetStateAction<boolean>>
}
const SetBudgetModal: FC<ModalProps> = ({ setBudgetAdded }) => {
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
            <Button type="primary" onClick={showModal}>
                SET BUDGET
            </Button>
            <Modal footer={null} title="SET BUDGET" className="!z-50" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <SetBudgetForm
                    setBudgetAdded={setBudgetAdded}
                    setIsModalOpen={setIsModalOpen}
                />
            </Modal>
        </>
    )
}

export default SetBudgetModal