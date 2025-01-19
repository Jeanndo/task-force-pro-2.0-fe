/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { useAppDispatch, useMessage } from '@/lib/hooks';
import { getUserAsync, loginUserAsync } from '@/redux/features/userSlice';
import { Col, Form, Row, Input, Button } from 'antd'
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react'
import { jwtDecode } from 'jwt-decode';

type ValuesType = {
    phone: string;
    password: string;
}

interface DecodedToken {
    exp: number;
    iat: number;
    id: string;
}

const LoginForm: FC = () => {

    const dispatch = useAppDispatch()
    const messenger = useMessage()
    const router = useRouter()

    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)

    const onFinish = (values: ValuesType) => {
        setLoading(true)
        dispatch(loginUserAsync(values)).then((response) => {
            //@ts-ignore
            if (response.payload.status === 200) {
                //@ts-ignore
                messenger.success(response.payload.message)
                //@ts-ignore
                const { token } = response.payload.data
                if (token) {
                    setLoading(false)
                    const decoded: DecodedToken = jwtDecode(token)
                    if (decoded) {
                        setLoading(true)
                        dispatch(getUserAsync({ id: decoded.id })).then((response) => {
                            //@ts-ignore
                            if (response.payload.status === 200) {
                                setLoading(false)
                                //@ts-ignore
                                localStorage.setItem("userId", response.payload.data.id)
                                router.push("/wallet")
                            } else {
                                //@ts-ignore
                                messenger.warning(response.payload.message)
                                setLoading(false)
                            }

                        })
                    }
                }

            } else {
                setLoading(false)
                //@ts-ignore
                messenger.warning(response.payload.message)
            }

        })

    }

    return (
        <Form
            form={form}
            name="Login-form"
            onFinish={onFinish}
            initialValues={{
                phone: '',
                password: ''
            }}
            layout='vertical'
        >
            <Row gutter={[16, 8]}>
                <Col xs={24}>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[{ required: true, message: 'Enter Phone Number' }]}
                    >
                        <Input placeholder="Enter Phone Number" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 8]}>
                <Col xs={24}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Enter Password' }]}
                    >
                        <Input.Password placeholder="Enter Password" />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item className='flex justify-end items-end'>
                <Button loading={loading} type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm