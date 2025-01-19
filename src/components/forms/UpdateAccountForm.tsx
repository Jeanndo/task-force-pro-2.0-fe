/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { useAppDispatch, useMessage } from '@/lib/hooks'
import { updateAccount } from '@/redux/features/accountSlice'
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
    accountId: string;
    name:string;
    type:string;
    balance:number;
    setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>
    setAccountUpdated:React.Dispatch<React.SetStateAction<boolean>>
}
const UpdateAccountForm: FC<FormProps> = ({setIsModalOpen,setAccountUpdated,accountId,name,type,balance}) => {

    const dispatch = useAppDispatch()
    const messenger = useMessage()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)

    const onFinish = (values: ValuesType) => {
        setLoading(true)
        setAccountUpdated(true)
        dispatch(updateAccount({id:accountId,name:values.name,type:values.type,balance:Number(values.balance)})).then((response)=>{
            if(response){
                //@ts-ignore
                if(response.payload.status===200){
                    //@ts-ignore
                    messenger.success(response.payload.message)
                    setLoading(false)
                    form.resetFields()
                    setIsModalOpen(false)
                    setAccountUpdated(false)
                }else{
                    //@ts-ignore
                    messenger.warning(response.payload.message)
                    setLoading(false)
                    setAccountUpdated(false)
                }
            }
        })
    }

    return (
        <Form
            form={form}
            name="update-account-form"
            onFinish={onFinish}
            initialValues={{
                name: name,
                type: type,
                balance: balance
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
                    Update
                </Button>
            </Form.Item>
        </Form>
    )
}

export default UpdateAccountForm