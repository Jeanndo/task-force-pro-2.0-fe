/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { useAppDispatch, useMessage } from '@/lib/hooks'
import { updateSubCategory } from '@/redux/features/subCategorySlice'
import { Col, Form, Row, Input,Button } from 'antd'
import React, { FC, useState } from 'react'

type ValuesType = {
    name: string;
    categoryId:string;
}

type FormProps = {
    subcategoryId: string;
    categoryId:string;
    name:string;
    setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>
    setSubCategoryUpdated:React.Dispatch<React.SetStateAction<boolean>>
}
const UpdateSubCategoryForm: FC<FormProps> = ({setIsModalOpen,setSubCategoryUpdated,subcategoryId,categoryId,name}) => {

    console.log("categoryId",categoryId)
    
    const dispatch = useAppDispatch()
    const messenger = useMessage()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)

    const onFinish = (values: ValuesType) => {
        setLoading(true)
        setSubCategoryUpdated(true)
        dispatch(updateSubCategory({id:subcategoryId,categoryId:values.categoryId,name:values.name})).then((response)=>{
            if(response){
                //@ts-ignore
                if(response.payload.status===200){
                    //@ts-ignore
                    messenger.success(response.payload.message)
                    setLoading(false)
                    form.resetFields()
                    setIsModalOpen(false)
                    setSubCategoryUpdated(false)
                }else{
                    //@ts-ignore
                    messenger.warning(response.payload.message)
                    setLoading(false)
                    setSubCategoryUpdated(false)
                }
            }
        })
    }

    return (
        <Form
            form={form}
            name="update-sub-category-form"
            onFinish={onFinish}
            initialValues={{
                name: name,
            }}
            layout='vertical'
        >
            <Row gutter={[16, 8]}>
                <Col xs={24}>
                    <Form.Item
                        label="Sub Category Name"
                        name="name"
                        rules={[{ required: true, message: 'Enter Sub Category Name' }]}
                    >
                        <Input placeholder="Enter Sub Category Name" />
                    </Form.Item>
                </Col>
                <Col xs={24}>
                    <Form.Item
                        label="Category Name"
                        name="categoryId"
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

export default UpdateSubCategoryForm