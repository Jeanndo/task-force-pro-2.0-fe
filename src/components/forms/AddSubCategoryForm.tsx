'use client'
import React, { FC, useState } from 'react'
import { Col, Form, Row, Input, Button, Select } from 'antd'

type ValuesType = {
    name: string;
}
type CategoryOption = {
    value: string;
    label: string;
}


const categoryData: CategoryOption[] = [
    {
        value: "Category 1",
        label: "Category 1",
    },
    {
        value: "Category 2",
        label: "Category 2",
    },
    {
        value: "Category 3",
        label: "Category 3",
    },
    {
        value: "Category 4",
        label: "Category 4",
    }
]

const AddSubCategoryForm: FC = () => {

    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)

    const onFinish = (values: ValuesType) => {
        setLoading(false)
        console.log('Received values of form: ', values)
    }

    return (
        <Form
            form={form}
            name="add-sub-category-form"
            onFinish={onFinish}
            initialValues={{
                name: '',
                categoryId: ""
            }}
            layout='vertical'
        >
            <Row gutter={[16, 8]}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Sub Category Name"
                        name="name"
                        rules={[{ required: true, message: 'Enter Sub Category Name' }]}
                    >
                        <Input placeholder="Enter Sub Category Name" />
                    </Form.Item>

                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Select Category"
                        name="categoryId"
                        rules={[{ required: true, message: 'Select Category' }]}
                    >
                        <Select showSearch allowClear placeholder="Select Category" options={categoryData} />
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

export default AddSubCategoryForm