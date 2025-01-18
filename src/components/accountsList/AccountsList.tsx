'use client'
import React, { useState } from 'react'
import DataTable from '../table/DataTable'
import { Space, Tag } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';

interface DataType {
    id: number;
    name: string;
    balance: number;
    type: string;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <span>{text}</span>,
    },
    
    {
        title: 'Type',
        key: 'type',
        dataIndex: 'type',
        render: (value) => (
            <>
                <Tag color={"green"} >
                            {value.toUpperCase()}
                        </Tag>
            </>
        ),
    },
    {
        title: 'Balance',
        dataIndex: 'balance',
        key: 'balance',
        render: (value) => `$${value.toFixed(2)}`,
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size="middle">
                Deposite
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        id: 1,
        name: 'Bank Account',
        balance: 100000,
        type: 'Bank',
    },
    {
        id: 2,
        name: 'Cash Account',
        balance: 1000000,
        type: 'Cash',
    },
    {
        id: 3,
        name: 'Mobile Money Account',
        balance: 500000,
        type: 'Momo',
    },
];
const AccountsList = () => {

    const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0, });
    const [loading, setLoading] = useState<boolean>(false)

    const handleTableChange = (pagination: TablePaginationConfig) => {
        setLoading(true);
        console.log('pagination', pagination)
        setPagination({ ...pagination })
    };

    const totalBalance = data.reduce((sum,item)=>sum + item.balance,0)

    return (
        <div>
            <DataTable<DataType>
                columns={columns}
                data={data}
                rowKey='id'
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
                showCheckbox={false}
                title='MY ACCOUNTS'
                footer={`Total Balance $${totalBalance}`}
            />
        </div>
    )
}

export default AccountsList