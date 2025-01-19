/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { useAppDispatch, useMessage } from '@/lib/hooks'
import { updateCategory } from '@/redux/features/categorySlice'
import { Col, Form, Row, Input,Button } from 'antd'
import React, { FC, useState } from 'react'

type ValuesType = {
    name: string;
}

type FormProps = {
    categoryId: string;
    name:string;
    setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>
    setCategoryUpdated:React.Dispatch<React.SetStateAction<boolean>>
}
const UpdateCategoryForm: FC<FormProps> = ({setIsModalOpen,setCategoryUpdated,categoryId,name}) => {

    const dispatch = useAppDispatch()
    const messenger = useMessage()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)

    const onFinish = (values: ValuesType) => {
        setLoading(true)
        setCategoryUpdated(true)
        dispatch(updateCategory({id:categoryId,name:values.name})).then((response)=>{
            if(response){
                //@ts-ignore
                if(response.payload.status===200){
                    //@ts-ignore
                    messenger.success(response.payload.message)
                    setLoading(false)
                    form.resetFields()
                    setIsModalOpen(false)
                    setCategoryUpdated(false)
                }else{
                    //@ts-ignore
                    messenger.warning(response.payload.message)
                    setLoading(false)
                    setCategoryUpdated(false)
                }
            }
        })
    }

    return (
        <Form
            form={form}
            name="update-category-form"
            onFinish={onFinish}
            initialValues={{
                name: name,
            }}
            layout='vertical'
        >
            <Row gutter={[16, 8]}>
                <Col xs={24}>
                    <Form.Item
                        label="Category Name"
                        name="name"
                        rules={[{ required: true, message: 'Enter Category Name' }]}
                    >
                        <Input placeholder="Enter Category Name" />
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

export default UpdateCategoryForm