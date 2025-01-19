"use client"
import React, { FC, useState } from 'react';
import { Modal } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';

interface ModalProps {
    title: string;
    content: string;
    onODelete: (id: string) => void;
    id: string;
    loading: boolean;
}

const DeleteModal: FC<ModalProps> = ({ id, title, content, onODelete, loading }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        onODelete(id)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <span onClick={showModal} className="cursor-pointer text-red-500"><DeleteOutlined /></span>
            <Modal
                title={<span className="uppercase text-red-500 font-medium text-sm">{title}</span>}
                okText={"Yes Delete"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={loading}
            >
                <p>{content}</p>
            </Modal>
        </>
    )
}

export default DeleteModal;