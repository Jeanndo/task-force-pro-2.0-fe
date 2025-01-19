/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React, { FC, useEffect, useState } from 'react'
import {type TablePaginationConfig, type TableProps } from 'antd';
import DataTable from '@/components/table/DataTable';
import BreadCrumbs from '@/components/BreadCrumb/BreadCrumb';
import AddSubCategoryModal from '@/components/modals/AddSubCategoryModal';
import { useAppDispatch, useMessage } from '@/lib/hooks';
import { Subcategory } from '@/lib/Interfaces';
import { deleteSubCategory, getSubCategories } from '@/redux/features/subCategorySlice';
import UpdateSubCategoryModal from '@/components/modals/UpdateSubcategoryModal';
import DeleteModal from '@/components/modals/DeleteModal';
import moment from 'moment';


const SubCategories: FC = () => {

    const dispatch = useAppDispatch()
    const messenger = useMessage()

    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0, });

    const [subcategories, setSubcategories] = useState<Subcategory[]>([])
    const [subcategoryAdded, setSubCategoryAdded] = useState<boolean>(false);
    const [subcategoryDeleted, setSubCategoryDeleted] = useState<boolean>(false);
    const [subcategoryUpdated, setSubCategoryUpdated] = useState<boolean>(false);

    useEffect(() => {
            dispatch(getSubCategories({
                page: pagination.current,
                limit: pagination.pageSize
            })).then((response) => {
                if (response) {
                    console.log("RESPONSE",response)
                    //@ts-ignore
                    if (response.payload.status === 200) {
                        //@ts-ignore
                        const availableSubCategories = response.payload.data.rows
                        setSubcategories(availableSubCategories)
                        setLoading(false)
    
                        setPagination({
                            ...pagination,
                            //@ts-ignore
                            current: response.payload.data.page,
                            //@ts-ignore
                            total: response.payload.data.count,
                            pageSize: pagination.pageSize,
                        })
                    } else {
                        setSubcategories([])
                    }
                }
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [subcategoryAdded, subcategoryDeleted, subcategoryUpdated])
    
        const handleTableChange = (pagination: TablePaginationConfig) => {
            setLoading(true)
            dispatch(getSubCategories({
                page: pagination.current,
                limit: pagination.pageSize
            })).then((response) => {
    
                if (response) {
                    //@ts-ignore
                    if (response.payload?.status === 200) {
                        //@ts-ignore
                        const availableCategories = response.payload.data.rows
                        setSubcategories(availableCategories)
                        setLoading(false)
    
    
                        setPagination({
                            ...pagination,
                            //@ts-ignore
                            current: response.payload.data.page,
                            //@ts-ignore
                            total: response.payload.data.count,
                            pageSize: pagination.pageSize,
                        })
                    } else {
                        //@ts-ignore
                        messenger.warning(response.payload.message)
                        setLoading(false)
                        setSubcategories([])
                    }
    
                }
            })
        };
    
        const handleDelete = (id: string) => {
            setLoading(true)
            setSubCategoryDeleted(true)
            dispatch(deleteSubCategory({ id: id })).then((response) => {
                if (response) {
                    //@ts-ignore
                    if (response.payload?.status === 200) {
                        messenger.success(response.payload.message)
                        setLoading(false)
                        setSubCategoryDeleted(false)
                    } else {
                        setLoading(false)
                        setSubCategoryDeleted(false)
                        //@ts-ignore
                        messenger.warning(response.payload.message)
                    }
                }
            })
        }

        const columns: TableProps<Subcategory>['columns'] = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text) => <span>{text}</span>,
            },
            {
                title: 'Created At',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (value) => <span>{moment(value).format('ll')}</span>,
            },
            {
                title: 'Action',
                key: 'action',
                render: (value) => <div className='flex justify-center items-center gap-x-4'>
                <UpdateSubCategoryModal
                    subcategoryId={value.id}
                    categoryId={value.id}
                    name={value.name}
                    setSubCategoryUpdated={setSubCategoryUpdated}
                />

                <DeleteModal
                    title={`Do you want to delete this sub category?`}
                    content={`Sub Category Name: ${value.name}`}
                    onODelete={handleDelete}
                    id={value.id}
                    loading={loading} />
            </div>,
            },
        ];

    return (
        <div className="max-w-3xl 2xl:max-w-5xl mx-auto my-auto">
            <div className="flex justify-around items-center mb-10">
                <BreadCrumbs data={[
                    { title: 'DASHBOARD', href: '/wallet' },
                    { title: 'SUB CATEGORIES' }]} />
                <AddSubCategoryModal setSubCategoryAdded={setSubCategoryAdded}/>
            </div>
            <DataTable<Subcategory>
                columns={columns}
                data={subcategories}
                rowKey='id'
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
                showCheckbox={false}
                title='SUB CATEGORIES'
            />
        </div>
    )
}

export default SubCategories