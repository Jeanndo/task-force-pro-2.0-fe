/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React, { FC, useState } from 'react'
import { Col, Form, Row, Button, DatePicker, Input } from 'antd'
import type { Dayjs } from 'dayjs';
import { useAppDispatch, useMessage } from '@/lib/hooks';
import { createBudget } from '@/redux/features/budgetSlice';


const { RangePicker } = DatePicker;


type ValuesType = {
    dates: string;
    amount: number;
}

type FormProps = {
    setBudgetAdded: React.Dispatch<React.SetStateAction<boolean>>
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const SetBudgetForm: FC<FormProps> = ({ setBudgetAdded, setIsModalOpen }) => {

    const dispatch = useAppDispatch()
    const messenger = useMessage()

    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)
    const [startDate, setStartDate] = useState<string | null>(null)
    const [endDate, setEndDate] = useState<string | null>(null)

    const onFinish = (values: ValuesType) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { dates, ...rest } = values
        setLoading(false)
        setBudgetAdded(true)

        dispatch(createBudget({ startDate, endDate, amount: rest.amount })).then((response) => {
            //@ts-ignore
            if (response.payload.status === 201) {
                //@ts-ignore
                messenger.success(response.payload.message)
                setLoading(false)
                form.resetFields()
                setIsModalOpen(false)
                setBudgetAdded(false)
            } else {
                //@ts-ignore
                messenger.warning(response.payload.message)
                setLoading(false)
                setBudgetAdded(false)
            }
        })
    }

    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            setStartDate(dateStrings[0])
            setEndDate(dateStrings[1])
        } else {
            setStartDate('')
            setEndDate('')
        }
    }

    return (
        <Form
            form={form}
            name="set-budget-form"
            onFinish={onFinish}
            initialValues={{
                dates: undefined,
                amount: 100,
            }}
            layout='vertical'
        >
            <Row gutter={[16, 8]}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Select Date Range"
                        name="dates"
                        rules={[{ required: true, message: 'Select date range' }]}
                    >
                        <RangePicker onChange={onRangeChange} className='w-full' />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
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

export default SetBudgetForm