/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React, { FC, useEffect, useState } from 'react'
import { Tag, type TablePaginationConfig, type TableProps } from 'antd';
import BreadCrumbs from '@/components/BreadCrumb/BreadCrumb';
import DataTable from '@/components/table/DataTable';
import AddTransactionModal from '@/components/modals/AddTransactionModal';
import { useAppDispatch, useMessage } from '@/lib/hooks';
import { Transaction } from '@/lib/Interfaces';
import { deleteTransaction, getTransactions } from '@/redux/features/transactionSlice';
import UpdateTransactionModal from '@/components/modals/UpdateTransactionModal';
import DeleteModal from '@/components/modals/DeleteModal';
import moment from 'moment';
import GenerateReportModal from '@/components/modals/GenerateReportModal';

//Expandale Transaction Row
const expandedRowRender = (record: Transaction) => (
    <div className="bg-gray-200 flex justify-start text-sm p-2">
        <div><p className="text-center">{record.description}</p></div>
    </div>
);

const Transactions: FC = () => {

    const dispatch = useAppDispatch() // Dispatcher
    const messenger = useMessage() // Message Toaster

    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0, }); // Pagination
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [transactionAdded, setTransactionAdded] = useState<boolean>(false);
    const [transactionDeleted, setTransactionDeleted] = useState<boolean>(false);
    const [transactionUpdated, setTransactionUpdated] = useState<boolean>(false);


    useEffect(() => {
        //Get transactions
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

                    // update Pagination
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
    }, [transactionAdded, transactionDeleted, transactionUpdated])

    // Get transactions on pagination change
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

                    // update Pagination
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

    // delete transactions function
    const handleDelete = (id: string) => {
        setLoading(true)
        setTransactionDeleted(true)
        dispatch(deleteTransaction({ id: id })).then((response) => {
            if (response) {
                //@ts-ignore
                if (response.payload?.status === 200) {
                    messenger.success(response.payload.message)
                    setLoading(false)
                    setTransactionDeleted(false)
                } else {
                    setLoading(false)
                    setTransactionDeleted(false)
                    //@ts-ignore
                    messenger.warning(response.payload.message)
                }
            }
        })
    }

    // Table columns definition
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
        },
        {
            title: 'Action',
            key: 'action',
            render: (value) => <div className='flex justify-center items-center gap-x-4'>
                <UpdateTransactionModal
                    transactionId={value.id}
                    accountId={value.accountId}
                    setTransactionUpdated={setTransactionUpdated}
                    categoryId={value.categoryId}
                    amount={value.amount}
                    type={value.type}
                    description={value.description}
                />

                <DeleteModal
                    title={`Do you want to delete this transaction?`}
                    content={`Transaction Amount: ${value.amount}`}
                    onODelete={handleDelete}
                    id={value.id}
                    loading={loading} />
            </div>,
        },
    ];

    return (
        <div className="max-w-3xl 2xl:max-w-5xl mx-auto my-auto">
            <div className="flex justify-around items-center mb-10">
                {/*Path History*/}
                <BreadCrumbs data={[
                    { title: 'DASHBOARD', href: '/wallet' },
                    { title: 'TRANSACTIONS' }]} />
                {/*Add Transaction Modal */}
                <AddTransactionModal setTransactionAdded={setTransactionAdded} />
                {/*Generate Report Modal*/}
                <GenerateReportModal />
            </div>
            {/*Transactions table*/}
            <DataTable<Transaction>
                columns={columns}
                data={transactions}
                rowKey='id'
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
                showCheckbox={false}
                expandable={{ expandedRowRender }}
                title='TRANSACTIONS'
            />
        </div>
    )
}

export default Transactions