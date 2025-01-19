/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { useAppDispatch, useMessage } from '@/lib/hooks'
import { Category } from '@/lib/Interfaces'
import { getCategories } from '@/redux/features/categorySlice'
import { updateSubCategory } from '@/redux/features/subCategorySlice'
import { Col, Form, Row, Input,Button, Select } from 'antd'
import React, { FC, useEffect, useState } from 'react'

type ValuesType = {
    name: string;
    categoryId:string;
}

type CategoryOption = {
    value: string;
    label: string;
}

type FormProps = {
    subcategoryId: string;
    categoryId:string;
    name:string;
    setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>
    setSubCategoryUpdated:React.Dispatch<React.SetStateAction<boolean>>
}
const UpdateSubCategoryForm: FC<FormProps> = ({setIsModalOpen,setSubCategoryUpdated,subcategoryId,categoryId,name}) => {
    
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
                categoryId:categoryId
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
                        <Select 
                            placeholder="Enter Category Name"
                            options={categories}/>
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