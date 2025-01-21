/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React, { FC, useEffect, useState } from 'react'
import DataTable from '../table/DataTable'
import { Tag } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import { useAppDispatch, useMessage } from '@/lib/hooks';
import { Account } from '@/lib/Interfaces';
import { deleteAccount, getAccounts } from '@/redux/features/accountSlice';
import { formatMoney } from '@/lib/utils';
import UpdateAccountModal from '../modals/UpdateAccountModal';
import DeleteModal from '../modals/DeleteModal';

/**
 *  Constants
 */
type ComponentProps = {
    accountAdded: boolean
}
const AccountsList: FC<ComponentProps> = ({ accountAdded }) => {

    const dispatch = useAppDispatch() // Acction dispatcher
    const messenger = useMessage() // Message Hook

    const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 2, total: 0, });
    const [loading, setLoading] = useState<boolean>(false)
    const [accounts, setAccounts] = useState<Account[]>([])
    const [accountUpdated, setAccountUpdated] = useState<boolean>(false)
    const [accountDeleted, setAccountDeleted] = useState<boolean>(false)


    useEffect(() => {
        setLoading(true);
        //Get accounts
        dispatch(getAccounts({
            page: pagination.current,
            limit: pagination.pageSize
        })).then((response) => {
            if (response) {
                //@ts-ignore
                if (response.payload.status === 200) {
                    //@ts-ignore
                    const availableAccounts = response.payload.data.rows
                    setAccounts(availableAccounts)
                    setLoading(false)

                    //Pagination
                    setPagination({
                        ...pagination,
                        //@ts-ignore
                        current: response.payload.data.page,
                        //@ts-ignore
                        total: response.payload.data.count,
                        pageSize: pagination.pageSize,
                    })
                } else {
                    setAccounts([])
                }
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountAdded, accountUpdated, accountDeleted])

    // on pagination change
    const handleTableChange = (pagination: TablePaginationConfig) => {
        setLoading(true)

        // get accounts
        dispatch(getAccounts({
            page: pagination.current,
            limit: pagination.pageSize
        })).then((response) => {

            if (response) {
                //@ts-ignore
                if (response.payload?.status === 200) {
                    //@ts-ignore
                    const availabbleAccounts = response.payload.data.rows
                    setAccounts(availabbleAccounts)
                    setLoading(false)

                    //Update Pagination
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
                    setAccounts([])
                }

            }
        })
    };

    //delete account function
    const handleDelete = (id: string) => {
        setLoading(true)
        setAccountDeleted(true)
        dispatch(deleteAccount({ id: id })).then((response) => {
            if (response) {
                //@ts-ignore
                if (response.payload?.status === 200) {
                    messenger.success(response.payload.message)
                    setLoading(false)
                    setAccountDeleted(false)
                } else {
                    setLoading(false)
                    setAccountDeleted(false)
                    //@ts-ignore
                    messenger.warning(response.payload.message)
                }
            }
        })
    }

    // Table column definitons
    const columns: TableProps<Account>['columns'] = [
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
            render: (value) => <span>{formatMoney({ amount: value, currency: 'RWF', locale: 'en-US' })}</span>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (value) => <div className='flex justify-center items-center gap-x-4'>
                <UpdateAccountModal
                    accountId={value.id}
                    name={value.name}
                    balance={value.balance}
                    type={value.type}
                    setAccountUpdated={setAccountUpdated}
                />

                <DeleteModal
                    title={`Do you want to delete this account?`}
                    content={`Account Name: ${value.name}`}
                    onODelete={handleDelete}
                    id={value.id}
                    loading={loading} />
            </div>,
        },
    ];

    // Calculate total balance of all accounts
    const totalBalance = accounts.reduce((sum, item) => sum + item.balance, 0)

    return (
        <div>
            <DataTable<Account>
                columns={columns}
                data={accounts}
                rowKey='id'
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
                showCheckbox={false}
                title='MY ACCOUNTS'
                footer={`Total Balance ${formatMoney({ amount: totalBalance, currency: 'RWF', locale: 'en-US' })}`}
            />
        </div>
    )
}

export default AccountsList