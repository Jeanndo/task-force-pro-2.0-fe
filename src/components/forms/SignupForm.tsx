/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { useAppDispatch, useMessage } from '@/lib/hooks';
import { registerUserAsync } from '@/redux/features/userSlice';
import { Col, Form, Row, Input, Button } from 'antd'
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react'

type ValuesType = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
}
const SignUpForm: FC = () => {

    const dispatch = useAppDispatch()
    const messenger = useMessage()
    const router = useRouter()

    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)

    const onFinish = (values: ValuesType) => {
        setLoading(true)
        dispatch(registerUserAsync(values)).then((response)=>{
            if(response){

                //@ts-ignore
                if(response.payload.status===201){
                    //@ts-ignore
                    messenger.success(response.payload.message)
                    router.push('/')
                    setLoading(false)
                    form.resetFields()
                }else{
                    //@ts-ignore
                    messenger.warning(response.payload.message)
                    setLoading(false)
                }
                
            }
        })
    }

    return (
        <Form
            form={form}
            name="sign-up-form"
            onFinish={onFinish}
            initialValues={{
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                password: ''
            }}
            layout='vertical'
        >
            <Row gutter={[16, 8]}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Enter First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Enter First Name' }]}
                    >
                        <Input placeholder="Enter First Name" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Enter Last Name"
                        name="lastName"
                        rules={[{ required: true, message: "Enter Last Name" }]}
                    >
                        <Input placeholder="Enter Last Name" />
                    </Form.Item>
                </Col>
            </Row>
            
            <Row gutter={[16, 8]}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[{required:true, message: 'Enter Phone Number' }]}
                    >
                        <Input placeholder="Enter Phone Number" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[{ required: true, message: 'Enter Email' }]}
                    >
                        <Input type="email" placeholder="Enter Email" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 8]}>
                <Col xs={24}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required:true, message: 'Enter Password' }]}
                    >
                        <Input.Password placeholder="Enter Password" />
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

export default SignUpForm