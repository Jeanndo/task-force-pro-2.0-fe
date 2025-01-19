/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React, { FC, useEffect, useState } from 'react'
import { type TablePaginationConfig, type TableProps } from 'antd';
import DataTable from '@/components/table/DataTable';
import BreadCrumbs from '@/components/BreadCrumb/BreadCrumb';
import AddCategoryModal from '@/components/modals/AddCategoryModal';
import { useAppDispatch, useMessage } from '@/lib/hooks';
import { deleteCategory, getCategories } from '@/redux/features/categorySlice';
import { Category } from '@/lib/Interfaces';
import DeleteModal from '@/components/modals/DeleteModal';
import UpdateCategoryModal from '@/components/modals/UpdateCategoryModal';
import moment from 'moment';

const Categories: FC = () => {

    const dispatch = useAppDispatch()
    const messenger = useMessage()

    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0, });

    const [categories, setCategories] = useState<Category[]>([])
    const [categoryAdded, setCategoryAdded] = useState<boolean>(false);
    const [categoryDeleted, setCategoryDeleted] = useState<boolean>(false);
    const [categoryUpdated, setCategoryUpdated] = useState<boolean>(false);


    useEffect(() => {
        dispatch(getCategories({
            page: pagination.current,
            limit: pagination.pageSize
        })).then((response) => {
            if (response) {
                //@ts-ignore
                if (response.payload.status === 200) {
                    //@ts-ignore
                    const availableCategories = response.payload.data.rows
                    setCategories(availableCategories)
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
                    setCategories([])
                }
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryAdded, categoryDeleted, categoryUpdated])

    const handleTableChange = (pagination: TablePaginationConfig) => {
        setLoading(true)
        dispatch(getCategories({
            page: pagination.current,
            limit: pagination.pageSize
        })).then((response) => {

            if (response) {
                //@ts-ignore
                if (response.payload?.status === 200) {
                    //@ts-ignore
                    const availableCategories = response.payload.data.rows
                    setCategories(availableCategories)
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
                    setCategories([])
                }

            }
        })
    };

    const handleDelete = (id: string) => {
        setLoading(true)
        setCategoryDeleted(true)
        dispatch(deleteCategory({ id: id })).then((response) => {
            if (response) {
                //@ts-ignore
                if (response.payload?.status === 200) {
                    messenger.success(response.payload.message)
                    setLoading(false)
                    setCategoryDeleted(false)
                } else {
                    setLoading(false)
                    setCategoryDeleted(false)
                    //@ts-ignore
                    messenger.warning(response.payload.message)
                }
            }
        })
    }

    const columns: TableProps<Category>['columns'] = [
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
                <UpdateCategoryModal
                    categoryId={value.id}
                    name={value.name}
                    setCategoryUpdated={setCategoryUpdated}
                />

                <DeleteModal
                    title={`Do you want to delete this category?`}
                    content={`Category Name: ${value.name}`}
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
                    { title: 'CATEGORIES' }]} />
                <AddCategoryModal setCategoryAdded={setCategoryAdded} />
            </div>
            <DataTable<Category>
                columns={columns}
                data={categories}
                rowKey='id'
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
                showCheckbox={false}
                title='CATEGORIES'
            />
        </div>
    )
}

export default Categories