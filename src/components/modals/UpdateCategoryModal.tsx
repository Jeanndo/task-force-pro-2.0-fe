'use client'
import React, { FC, useState } from 'react';
import { Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import UpdateCategoryForm from '../forms/UpdateCategoryForm';

type ModalProps = {
    setCategoryUpdated: React.Dispatch<React.SetStateAction<boolean>>
    categoryId: string;
    name: string;
}
const UpdateCategoryModal: FC<ModalProps> = ({ setCategoryUpdated, categoryId, name }) => {
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
            <Modal footer={null} title="UPDATE CATEGORY" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <UpdateCategoryForm
                    setIsModalOpen={setIsModalOpen}
                    setCategoryUpdated={setCategoryUpdated}
                    categoryId={categoryId}
                    name={name}
                />
            </Modal>
        </>
    );
};

export default UpdateCategoryModal;