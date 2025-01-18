'use client'
import { Col, Form, Row, Input, Select, Button } from 'antd'
import React, { FC, useState } from 'react'

type AccountType = {
    value: string,
    label: string
}

const AccountOptions: AccountType[] = [
    {
        value: 'BANK',
        label: 'BANK'
    },
    {
        value: 'MOILE MONEY',
        label: 'MOILE MONEY'
    },
    {
        value: 'CASH',
        label: 'CASH'
    }
]

type ValuesType = {
    accountId: string;
    categoryId: string;
    amount: number;
    type: string;
    description: string;
}
const AddTransactionForm: FC = () => {

    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)

    const onFinish = (values: ValuesType) => {
        setLoading(false)
        console.log('Received values of form: ', values)
    }

    return (
        <Form
            form={form}
            name="add-transaction-form"
            onFinish={onFinish}
            initialValues={{
                accountId: '',
                categoryId: '',
                amount: 0,
                type:'',
                description:''
            }}
            layout='vertical'
        >
            <Row gutter={[16, 8]}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Select Account"
                        name="accountId"
                        rules={[{ required: true, message: 'Select Account' }]}
                    >
                        <Select
                            showSearch
                            allowClear
                            placeholder="Select Account"
                            options={AccountOptions}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Select Category"
                        name="categoryId"
                        rules={[{ required: true, message: "Select Categogry" }]}
                    >
                        <Select
                            showSearch
                            allowClear
                            placeholder="Select Category"
                            options={AccountOptions}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 8]}>
                <Col xs={24}>
                    <Form.Item
                        label="Sub Category"
                        name="subcategoryId"
                        rules={[{ message: 'Select Sub Category' }]}
                    >
                        <Select
                            showSearch
                            allowClear
                            placeholder="Select Sub Category"
                            options={AccountOptions}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 8]}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Amount"
                        name="amount"
                        rules={[{ required: true, message: 'Enter Amount' }]}
                    >
                        <Input type="number" placeholder="Enter Amount" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Select Type"
                        name="type"
                        rules={[{ required: true, message: 'Select Type' }]}
                    >
                        <Select showSearch
                            allowClear
                            options={AccountOptions}
                            placeholder="Select Type"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 8]}>
                <Col xs={24}>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Enter Description' }]}
                    >
                        <Input  placeholder="Enter Description" />
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

export default AddTransactionForm