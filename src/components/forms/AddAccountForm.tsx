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
    name: string;
    balance: number;
    type: string;
}
const AddAccountForm: FC = () => {

    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)

    const onFinish = (values: ValuesType) => {
        setLoading(false)
        console.log('Received values of form: ', values)
    }

    return (
        <Form
            form={form}
            name="add-account-form"
            onFinish={onFinish}
            initialValues={{
                name: '',
                type: '',
                balance: 0
            }}
            layout='vertical'
        >
            <Row gutter={[16, 8]}>
                <Col xs={24}>
                    <Form.Item
                        label="Account Name"
                        name="name"
                        rules={[{ required: true, message: 'Enter Account Name' }]}
                    >
                        <Input placeholder="Enter Account Name" />
                    </Form.Item>
                </Col>
                <Col xs={24}>
                    <Form.Item
                        label="Account Type"
                        name="type"
                        rules={[{ required: true, message: "Select Account Type" }]}
                    >
                        <Select
                            showSearch
                            allowClear
                            placeholder="Select Account Type"
                            options={AccountOptions}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 8]}>
                <Col xs={24}>
                    <Form.Item
                        label="Account Balance"
                        name="balance"
                        rules={[{ required: true, message: 'Enter Account Balance' }]}
                    >
                        <Input type="number" placeholder="Enter Account Balance" />
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

export default AddAccountForm