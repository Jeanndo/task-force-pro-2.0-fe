/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React, { FC, useEffect, useState } from 'react'
import {Tag, type TablePaginationConfig, type TableProps } from 'antd';
import DataTable from '@/components/table/DataTable';
import { Card } from '@tremor/react';
import { useAppDispatch, useMessage } from '@/lib/hooks';
import { Transaction } from '@/lib/Interfaces';
import moment from 'moment';
import { getTransactions } from '@/redux/features/transactionSlice';
import GenerateReportModal from '../modals/GenerateReportModal';

const expandedRowRender = (record: Transaction) => (
    <div className="bg-gray-200 flex justify-start text-sm p-2">
        <div><p className="text-center">{record.description}</p></div>
    </div>
);

const CurrentTransactions: FC = () => {
    const dispatch = useAppDispatch()
    const messenger = useMessage()

    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0, });
    const [transactions, setTransactions] = useState<Transaction[]>([])


    useEffect(() => {
        dispatch(getTransactions({
            page: pagination.current,
            limit: pagination.pageSize
        })).then((response) => {
            if (response) {
                //@ts-ignore
                if (response.payload.status === 200) {
                    //@ts-ignore
                    const availableTransactions = response.payload.data.rows
                    setTransactions(availableTransactions)
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
                    setTransactions([])
                }
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleTableChange = (pagination: TablePaginationConfig) => {
        setLoading(true)
        dispatch(getTransactions({
            page: pagination.current,
            limit: pagination.pageSize
        })).then((response) => {

            if (response) {
                //@ts-ignore
                if (response.payload?.status === 200) {
                    //@ts-ignore
                    const availableTransactions = response.payload.data.rows
                    setTransactions(availableTransactions)
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
                    setTransactions([])
                }

            }
        })
    };

    const columns: TableProps<Transaction>['columns'] = [
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
            render: (_, record) => <div>{record.category.name}</div>
        },
        {
            title: 'Sub Category',
            dataIndex: 'subcategory',
            key: 'subcategory',
            render: (_, record) => <div>{record?.subcategory ? record?.subcategory?.name : 'N/A'}</div>
        },
        {
            title: 'Account',
            dataIndex: 'account',
            key: 'account',
            render: (_, record) => <div>{record.account.name}</div>
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value) => <span>{moment(value).format('ll')}</span>,
        }
    ];

    return (
        <Card className="p-2 !bg-white border-none">
            <GenerateReportModal/>
            <DataTable<Transaction>
                columns={columns}
                data={transactions}
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