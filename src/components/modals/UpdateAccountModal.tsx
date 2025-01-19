'use client'
import React, { FC, useState } from 'react';
import {Modal } from 'antd';
import UpdateAccountForm from '../forms/UpdateAccountForm';
import { EditOutlined } from '@ant-design/icons';

type ModalProps = {
    setAccountUpdated:React.Dispatch<React.SetStateAction<boolean>>
    accountId:string;
    name:string;
    balance:number;
    type:string;
}
const UpdateAccountModal: FC<ModalProps> = ({setAccountUpdated,accountId,name,balance,type}) => {
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
            <Modal footer={null} title="UPDATE ACCOUNT" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <UpdateAccountForm 
                setIsModalOpen={setIsModalOpen}
                setAccountUpdated={setAccountUpdated}
                accountId={accountId}
                name={name}
                type={type}
                balance={balance}
                />
            </Modal>
        </>
    );
};

export default UpdateAccountModal;