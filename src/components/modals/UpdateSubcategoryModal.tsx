'use client'
import React, { FC, useState } from 'react';
import { Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import UpdateSubCategoryForm from '../forms/UpdateSubcategoryForm';

type ModalProps = {
    setSubCategoryUpdated: React.Dispatch<React.SetStateAction<boolean>>
    subcategoryId: string;
    categoryId:string;
    name: string;
}
const UpdateSubCategoryModal: FC<ModalProps> = ({ setSubCategoryUpdated, subcategoryId, name,categoryId }) => {
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
            <Modal footer={null} title="UPDATE SUB CATEGORY" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <UpdateSubCategoryForm
                    setIsModalOpen={setIsModalOpen}
                    setSubCategoryUpdated={setSubCategoryUpdated}
                    subcategoryId={subcategoryId}
                    name={name}
                    categoryId={categoryId}
                />
            </Modal>
        </>
    );
};

export default UpdateSubCategoryModal;