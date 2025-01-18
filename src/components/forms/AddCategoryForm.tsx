'use client'
import React, { FC, useState } from 'react'
import { Col, Form, Row, Input, Button } from 'antd'

type ValuesType = {
    name: string;
}
const AddCateogryForm: FC = () => {

    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)

    const onFinish = (values: ValuesType) => {
        setLoading(false)
        console.log('Received values of form: ', values)
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