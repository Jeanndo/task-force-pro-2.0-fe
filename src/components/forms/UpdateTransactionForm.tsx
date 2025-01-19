/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { useAppDispatch, useMessage } from '@/lib/hooks';
import { Category } from '@/lib/Interfaces';
import { getCategories } from '@/redux/features/categorySlice';
import { updateTransaction } from '@/redux/features/transactionSlice';
import { Col, Form, Row, Input, Select, Button } from 'antd'
import React, { FC, useEffect, useState } from 'react'

type OptionType = {
    value: string;
    label: string;
}

const transactionType: OptionType[] = [
    {
        value: 'Expense',
        label: 'Expense'
    },
    {
        value: 'Income',
        label: 'Income'
    }
]


type ValuesType = {
    accountId: string;
    categoryId: string;
    amount: number;
    type: string;
    description: string;
}

type FormProps = {
    setTransactionUpdated: React.Dispatch<React.SetStateAction<boolean>>
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    transactionId: string;
    accountId: string;
    categoryId: string;
    amount: number;
    type: string;
    description: string;
}
const UpdateTransactionForm: FC<FormProps> = ({ setTransactionUpdated, accountId, categoryId, amount, type, description, transactionId, setIsModalOpen }) => {

    const dispatch = useAppDispatch()
    const messenger = useMessage()

    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)
    const [categories, setCategories] = useState<OptionType[]>([])

    useEffect(() => {
        dispatch(getCategories({})).then((response) => {
            if (response) {
                //@ts-ignore
                if (response.payload.status === 200) {
                    //@ts-ignore
                    const availableCategories = response.payload.data.rows
                    setCategories(availableCategories.map((category: Category) => ({
                        value: category.id,
                        label: category.name
                    })))
                }
            }

        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onFinish = (values: ValuesType) => {
        setLoading(true)
        setTransactionUpdated(true)
        dispatch(updateTransaction({ id: transactionId, ...values })).then((response) => {
            if (response) {
                //@ts-ignore
                if (response.payload.status === 200) {
                    //@ts-ignore
                    messenger.success(response.payload?.message)
                    setLoading(false)
                    setTransactionUpdated(false)
                    setIsModalOpen(false)
                } else {
                    //@ts-ignore
                    messenger.warning(response.payload?.message)
                    setLoading(false)
                    setTransactionUpdated(false)
                }
            }
        })
    }

    return (
        <Form
            form={form}
            name="update-transaction-form"
            onFinish={onFinish}
            initialValues={{
                accountId: accountId,
                categoryId: categoryId,
                amount: amount,
                type: type,
                description: description
            }}
            layout='vertical'
        >
            <Row gutter={[16, 8]}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Select Type"
                        name="type"
                        rules={[{ required: true, message: 'Select Type' }]}
                    >
                        <Select showSearch
                            allowClear
                            options={transactionType}
                            placeholder="Select Type"
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
                            options={categories}
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
                        <Input placeholder="Enter Description" />
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

export default UpdateTransactionForm