'use client'
import React, { FC, useState } from 'react'
import { Space, Tag, type TablePaginationConfig, type TableProps } from 'antd';
import DataTable from '@/components/table/DataTable';
import { Card } from '@tremor/react';
interface DataType {
    id: number;
    type: string;
    amount: number;
    account: string;
    category: string;
    subcategory: string;
    description: string;
    createdAt: string;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: (value) => <span>{value} FRW</span>,
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: (value) => <div>{value === "Expense" ? <Tag color="red">{value}</Tag> : <Tag color="green">{value}</Tag>}</div>
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Sub Category',
        dataIndex: 'subcategory',
        key: 'subcategory',
    },
    {
        title: 'Account',
        dataIndex: 'account',
        key: 'account',
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
        type: 'Expense',
        amount: 1000,
        account: "CASH",
        category: "Food",
        subcategory: "N/A",
        description: "This is my description",
        createdAt: '2022-01-01',
    },
    {
        id: 2,
        type: 'Expense',
        amount: 1000,
        account: "CASH",
        category: "Food",
        subcategory: "N/A",
        description: "This is my description",
        createdAt: '2022-01-01',
    },
    {
        id: 3,
        type: 'Income',
        amount: 1000,
        account: "CASH",
        category: "Food",
        subcategory: "N/A",
        description: "This is my description",
        createdAt: '2022-01-01',
    },
];

const expandedRowRender = (record: DataType) => (
    <div className="bg-gray-200 flex justify-start text-sm p-2">
        <div><p className="text-center">{record.description}</p></div>
    </div>
);

const CurrentTransactions: FC = () => {

    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0, });

    const handleTableChange = (pagination: TablePaginationConfig) => {
        setLoading(true);
        console.log('pagination', pagination)
        setPagination({ ...pagination })
    };

    return (
        <Card className="p-2 !bg-white border-none">
            <DataTable<DataType>
                columns={columns}
                data={data}
                rowKey='id'
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
                showCheckbox={false}
                expandable={{ expandedRowRender }}
                title='CURRENT TRANSACTIONS'
            />
        </Card>
    )
}

export default CurrentTransactions