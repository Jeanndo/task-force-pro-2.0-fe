'use client'
import React, { FC, useState } from 'react'
import { Col, Form, Row,Button,DatePicker, Input} from 'antd'
import type { Dayjs } from 'dayjs';


const { RangePicker } = DatePicker;


type ValuesType = {
    dates: string;
    amount: number;
}
const SetBudgetForm: FC = () => {

    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)
    const [startDate, setStartDate] = useState<string| null>(null)
    const [endDate, setEndDate] = useState<string| null>(null)

    const onFinish = (values: ValuesType) => {
        setLoading(false)

        
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {dates,...rest} = values

        console.log('Received values of form: ', rest)
        console.log("Start Date",startDate)
        console.log("End Date",endDate)
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
                dates:undefined,
                amount: 100,
            }}
            layout='vertical'
        >
            <Row gutter={[16, 8]}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Select Date Range"
                        name="dates"
                        rules={[{required:true, message: 'Select date range' }]}
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