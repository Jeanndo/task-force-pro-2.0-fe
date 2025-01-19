/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React, { FC, useState } from 'react'
import { Col, Form, Row, Button, DatePicker, Input } from 'antd'
import type { DatePickerProps } from 'antd';
import { useAppDispatch, useMessage } from '@/lib/hooks';
import { updateBudget } from '@/redux/features/budgetSlice';

type ValuesType = {
    dates: string;
    amount: number;
}

type FormProps = {
    setBudgetUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    amount: number;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    budgetId: string;
}
const UpdateBudgetForm: FC<FormProps> = ({ budgetId, setBudgetUpdated, amount, setIsModalOpen }) => {

    const dispatch = useAppDispatch()
    const messenger = useMessage()

    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)
    const [startDate, setStartDate] = useState<string | string[]>('')
    const [endDate, setEndDate] = useState<string | string[]>('')

    const onFinish = (values: ValuesType) => {
        setLoading(true)
        setBudgetUpdated(true)
        dispatch(updateBudget({ id: budgetId, amount: values.amount, startDate: startDate, endDate: endDate })).then((response) => {
            //@ts-ignore
            if (response.payload.status === 200) {
                //@ts-ignore
                messenger.success(response.payload.message)
                setLoading(false)
                form.resetFields()
                setIsModalOpen(false)
                setBudgetUpdated(false)
            } else {
                //@ts-ignore
                messenger.warning(response.payload.message)
                setLoading(false)
                setBudgetUpdated(false)
            }
        })
    }


    const onStartDateChange: DatePickerProps['onChange'] = (_, dateString) => {
        setStartDate(dateString)
    };

    const onEndDateChange: DatePickerProps['onChange'] = (_, dateString) => {
        setEndDate(dateString)
    };

    return (
        <Form
            form={form}
            name="update-budget-form"
            onFinish={onFinish}
            initialValues={{
                startDate:undefined,
                endDate:undefined,
                amount: amount,
            }}
            layout='vertical'
        >
            <Row gutter={[16, 8]}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Select Start Date"
                        name="startDate"
                        rules={[{ required: true, message: 'Select date range' }]}
                    >
                        <DatePicker onChange={onStartDateChange} className='w-full' />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Select Start Date"
                        name="endDate"
                        rules={[{ required: true, message: 'Select date range' }]}
                    >
                        <DatePicker onChange={onEndDateChange} className='w-full' />
                    </Form.Item>
                </Col>

            </Row>
            <Row gutter={[16, 8]}>
                <Col xs={24}>
                    <Form.Item
                        label="Budget Limit"
                        name="amount"
                        rules={[{ required: true, message: "Enter budget Limit" }]}
                    >
                        <Input min={1} type="number"
                            placeholder="Enter budget Limit"
                        />
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

export default UpdateBudgetForm