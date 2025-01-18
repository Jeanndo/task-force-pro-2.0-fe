'use client'
import React, { FC, useState } from 'react';
import { Button, Modal } from 'antd';
import AddCateogryForm from '../forms/AddCategoryForm';

const AddCategoryModal: FC = () => {
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
                ADD CATEGORY
            </Button>
            <Modal footer={null} title="Category Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <AddCateogryForm/>
            </Modal>
        </>
    );
};

export default AddCategoryModal;