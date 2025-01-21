/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React, { useState } from 'react'
import { Button, Row, Form, DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import { useAppDispatch, useMessage } from '@/lib/hooks';
import { getTransactionReport } from '@/redux/features/transactionSlice';

const { RangePicker } = DatePicker;


const GenerateReportForm = () => {
    const dispatch = useAppDispatch()
    const messenger = useMessage()
    const [fromDate, setFromDate] = useState<string>('')
    const [toDate, setToDate] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    //@ts-ignore
    const onFinish = (values) => {
        setLoading(true)
        dispatch(getTransactionReport({
            fromDate: fromDate,
            toDate: toDate,
        })).then((response) => {
            if (response) {
                setLoading(false)
                //@ts-ignore
                if (response.payload.type) {
                    messenger.success("Check your downloaded report in your downloads folder")
                    setLoading(false)
                } else {
                    setLoading(false)
                    //@ts-ignore
                    messenger.warning("Error downloading report")
                }
            }
        })
    };

    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            setFromDate(dateStrings[0])
            setToDate(dateStrings[1])
        } else {
            setFromDate('')
            setToDate('')
        }
    }

    return (
        <Form
            name="report-form"
            onFinish={onFinish}
            layout='vertical'
        >
            <Row gutter={[16, 8]}>
                <RangePicker onChange={onRangeChange} className='w-full' />
            </Row>

            <Form.Item className='flex justify-end items-end !mt-5'>
                <Button loading={loading} type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default GenerateReportForm