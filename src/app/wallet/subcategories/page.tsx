'use client'
import React, { FC, useState } from 'react'
import { Space, type TablePaginationConfig, type TableProps } from 'antd';
import DataTable from '@/components/table/DataTable';
import BreadCrumbs from '@/components/BreadCrumb/BreadCrumb';
import AddSubCategoryModal from '@/components/modals/AddSubCategoryModal';

interface DataType {
    id: number;
    name: string;
    category: string;
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
        category: 'Bank Account',
        createdAt: '2022-01-01',
    },
    {
        id: 2,
        name: 'Cash Account',
        category: 'Bank Account',
        createdAt: '2022-01-01',
    },
    {
        id: 3,
        name: 'Bank Account',
        category: 'Bank Account',
        createdAt: '2022-01-01',
    },
];

const expandedRowRender = (record: DataType) => (
    <div className="bg-gray-200 flex justify-start text-sm p-2">
        <div><p className="text-center"><span className="mr-3">Category: </span>{record.category}</p></div>
    </div>
);

const SubCategories: FC = () => {

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
                    { title: 'SUB CATEGORIES' }]} />
                <AddSubCategoryModal />
            </div>
            <DataTable<DataType>
                columns={columns}
                data={data}
                rowKey='id'
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
                showCheckbox={false}
                expandable={{ expandedRowRender }}
                title='SUB CATEGORIES'
            />
        </div>
    )
}

export default SubCategories