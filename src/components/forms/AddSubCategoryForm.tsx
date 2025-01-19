/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React, { FC, useEffect, useState } from 'react'
import { Col, Form, Row, Input, Button, Select } from 'antd'
import { useAppDispatch, useMessage } from '@/lib/hooks';
import { createSubCategory } from '@/redux/features/subCategorySlice';
import { getCategories } from '@/redux/features/categorySlice';
import { Category } from '@/lib/Interfaces';

type ValuesType = {
    name: string;
    categoryId:string;
}
type CategoryOption = {
    value: string;
    label: string;
}


type FormProps ={
    setSubCategoryAdded:React.Dispatch<React.SetStateAction<boolean>>;
    setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

const AddSubCategoryForm: FC<FormProps> = ({setSubCategoryAdded,setIsModalOpen}) => {

    const dispatch = useAppDispatch()
    const messenger = useMessage()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)
    const [categories,setCategories] = useState<CategoryOption[]>([])


    useEffect(()=>{
        dispatch(getCategories({})).then((response)=>{
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
    },[])

    const onFinish = (values: ValuesType) => {
        setLoading(true)
        setSubCategoryAdded(true)
        dispatch(createSubCategory(values)).then((response)=>{
            if (response) {
                //@ts-ignore
                if (response.payload.status === 201) {
                    //@ts-ignore
                    messenger.success(response.payload.message)
                    setLoading(false)
                    form.resetFields()
                    setIsModalOpen(false)
                    setSubCategoryAdded(false)
                } else {
                    //@ts-ignore
                    messenger.warning(response.payload.message)
                    setLoading(false)
                    setSubCategoryAdded(false)
                }
            }
        })
    }



    return (
        <Form
            form={form}
            name="add-sub-category-form"
            onFinish={onFinish}
            initialValues={{
                name: '',
                categoryId: ""
            }}
            layout='vertical'
        >
            <Row gutter={[16, 8]}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Sub Category Name"
                        name="name"
                        rules={[{ required: true, message: 'Enter Sub Category Name' }]}
                    >
                        <Input placeholder="Enter Sub Category Name" />
                    </Form.Item>

                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Select Category"
                        name="categoryId"
                        rules={[{ required: true, message: 'Select Category' }]}
                    >
                        <Select showSearch allowClear placeholder="Select Category" options={categories} />
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

export default AddSubCategoryForm