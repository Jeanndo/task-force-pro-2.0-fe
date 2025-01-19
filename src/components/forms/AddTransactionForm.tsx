/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { useAppDispatch, useMessage } from '@/lib/hooks'
import { Account, Category } from '@/lib/Interfaces'
import { getAccounts } from '@/redux/features/accountSlice'
import { getCategories } from '@/redux/features/categorySlice'
import { createTransaction } from '@/redux/features/transactionSlice'
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
    setTransactionAdded: React.Dispatch<React.SetStateAction<boolean>>
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const AddTransactionForm: FC<FormProps> = ({ setTransactionAdded, setIsModalOpen }) => {

    const dispatch = useAppDispatch()
    const messenger = useMessage()

    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)

    const [categories, setCategories] = useState<OptionType[]>([])
    const [accountOptions, setAccountOptions] = useState<OptionType[]>([])


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

        dispatch(getAccounts({})).then((response) => {
            if (response) {
                //@ts-ignore
                if (response.payload.status === 200) {
                    //@ts-ignore
                    const availableAccounts = response.payload.data.rows
                    setAccountOptions(availableAccounts.map((account: Account) => ({
                        value: account.id,
                        label: account.name
                    })))
                }
            }

        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onFinish = (values: ValuesType) => {
        setLoading(true)
        setTransactionAdded(true)
        dispatch(createTransaction(values)).then((response) => {
            if (response) {
                //@ts-ignore
                if (response.payload.status === 201) {
                    //@ts-ignore
                    messenger.success(response.payload.message)
                    setLoading(false)
                    form.resetFields()
                    setIsModalOpen(false)
                    setTransactionAdded(false)
                } else {
                    //@ts-ignore
                    messenger.warning(response.payload.message)
                    setLoading(false)
                    setTransactionAdded(false)
                }
            }
        })
    }

    //createTransaction getAccounts

    return (
        <Form
            form={form}
            name="add-transaction-form"
            onFinish={onFinish}
            initialValues={{
                accountId: '',
                categoryId: '',
                amount: 0,
                type: '',
                description: ''
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
                            options={accountOptions}
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
            {/* <Row gutter={[16, 8]}>
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
                            options={transactionType}
                        />
                    </Form.Item>
                </Col>
            </Row> */}
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
                            options={transactionType}
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

export default AddTransactionForm