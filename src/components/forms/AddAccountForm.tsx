/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { useAppDispatch, useMessage } from '@/lib/hooks'
import { createAccount } from '@/redux/features/accountSlice'
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

type FormProps = {
    setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>
    setAccountAdded:React.Dispatch<React.SetStateAction<boolean>>
}
const AddAccountForm: FC<FormProps> = ({setIsModalOpen,setAccountAdded}) => {

    const dispatch = useAppDispatch()
    const messenger = useMessage()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)

    const onFinish = (values: ValuesType) => {
        setLoading(true)
        setAccountAdded(true)
        dispatch(createAccount(values)).then((response)=>{
            if(response){
                //@ts-ignore
                if(response.payload.status===201){
                    //@ts-ignore
                    messenger.success(response.payload.message)
                    setLoading(false)
                    form.resetFields()
                    setIsModalOpen(false)
                    setAccountAdded(false)
                }else{
                    //@ts-ignore
                    messenger.warning(response.payload.message)
                    setLoading(false)
                    setAccountAdded(false)
                }
            }
        })
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