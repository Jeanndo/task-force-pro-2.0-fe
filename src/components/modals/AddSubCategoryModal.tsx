'use client'
import { Button, Modal } from 'antd';
import React, { FC, useState } from 'react'
import AddSubCategoryForm from '../forms/AddSubCategoryForm';

type ModalProps = {
    setSubCategoryAdded: React.Dispatch<React.SetStateAction<boolean>>
}
const AddSubCategoryModal: FC<ModalProps> = ({ setSubCategoryAdded }) => {

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
                ADD SUB CATEGORY
            </Button>
            <Modal footer={null} title="SUB CATEGORY" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <AddSubCategoryForm
                    setSubCategoryAdded={setSubCategoryAdded}
                    setIsModalOpen={setIsModalOpen}
                />
            </Modal>
        </>
    )
}

export default AddSubCategoryModal