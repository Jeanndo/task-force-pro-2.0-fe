/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React, { FC, useState } from 'react'
import { Col, Form, Row, Input, Button } from 'antd'
import { useAppDispatch, useMessage } from '@/lib/hooks';
import { createCategory } from '@/redux/features/categorySlice';

type ValuesType = {
    name: string;
}

type FormProps = {
    setCategoryAdded: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddCateogryForm: FC<FormProps> = ({ setCategoryAdded, setIsModalOpen }) => {

    const dispatch = useAppDispatch()
    const messenger = useMessage()

    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)

    const onFinish = (values: ValuesType) => {
        setLoading(false)
        setCategoryAdded(true)
        dispatch(createCategory(values)).then((response) => {
            if (response) {
                //@ts-ignore
                if (response.payload.status === 201) {
                    //@ts-ignore
                    messenger.success(response.payload.message)
                    setLoading(false)
                    form.resetFields()
                    setIsModalOpen(false)
                    setCategoryAdded(false)
                } else {
                    //@ts-ignore
                    messenger.warning(response.payload.message)
                    setLoading(false)
                    setCategoryAdded(false)
                }
            }
        })
    }

    return (
        <Form
            form={form}
            name="add-category-form"
            onFinish={onFinish}
            initialValues={{
                name: '',
            }}
            layout='vertical'
        >
            <Row gutter={[16, 8]}>
                <Col xs={24}>
                    <Form.Item
                        label="Category Name"
                        name="name"
                        rules={[{ required: true, message: 'Enter Category Name' }]}
                    >
                        <Input placeholder="Enter Category Name" />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item className='flex justify-end items-end'>
                <Button loading={loading} type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AddCateogryForm