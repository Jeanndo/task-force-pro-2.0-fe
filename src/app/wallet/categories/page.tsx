'use client'
import React, { FC, useState } from 'react'
import { Space, type TablePaginationConfig, type TableProps } from 'antd';
import DataTable from '@/components/table/DataTable';
import BreadCrumbs from '@/components/BreadCrumb/BreadCrumb';
import AddCategoryModal from '@/components/modals/AddCategoryModal';

interface DataType {
    id: number;
    name: string;
    createdAt: string;
}

const columns: TableProps<DataType>['columns'] = [
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
        render: (value) => <span>{value}</span>,
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size="middle">
                Delete
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        id: 1,
        name: 'Bank Account',
        createdAt: '2022-01-01',
    },
    {
        id: 2,
        name: 'Cash Account',
        createdAt: '2022-01-01',
    },
    {
        id: 3,
        name: 'Mobile Money Account',
        createdAt: '2022-01-01',
    },
];

const Categories: FC = () => {

    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0, });

    const handleTableChange = (pagination: TablePaginationConfig) => {
        setLoading(true);
        console.log('pagination', pagination)
        setPagination({ ...pagination })
    };

    return (
        <div className="max-w-3xl 2xl:max-w-5xl mx-auto my-auto">
            <div className="flex justify-around items-center mb-10">
                <BreadCrumbs data={[
                    { title: 'DASHBOARD', href: '/wallet' },
                    { title: 'CATEGORIES' }]} />
                <AddCategoryModal />
            </div>
            <DataTable<DataType>
                columns={columns}
                data={data}
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