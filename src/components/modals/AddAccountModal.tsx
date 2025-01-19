'use client'
import React, { FC, useState } from 'react';
import { Button, Modal } from 'antd';
import AddAccountForm from '../forms/AddAccountForm';

type ModalProps = {
    setAccountAdded:React.Dispatch<React.SetStateAction<boolean>>
}
const AddAccountModal: FC<ModalProps> = ({setAccountAdded}) => {
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
                ADD ACCOUNT
            </Button>
            <Modal footer={null} title="ADD ACCOUNT" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <AddAccountForm 
                setIsModalOpen={setIsModalOpen}
                setAccountAdded={setAccountAdded}
                />
            </Modal>
        </>
    );
};

export default AddAccountModal;