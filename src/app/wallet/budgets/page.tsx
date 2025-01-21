/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React, { FC, useEffect, useState } from 'react'
import { type TablePaginationConfig, type TableProps } from 'antd';
import DataTable from '@/components/table/DataTable';
import BreadCrumbs from '@/components/BreadCrumb/BreadCrumb';
import BudgetSlider from '@/components/budgetSlider/BudgetSlider';
import SetBudgetModal from '@/components/modals/SetBudgetModal';
import { useAppDispatch, useMessage } from '@/lib/hooks';
import { Budget } from '@/lib/Interfaces';
import { deleteBudget, getBudgets } from '@/redux/features/budgetSlice';
import UpdateBudgetModal from '@/components/modals/UpdateudgetModal';
import DeleteModal from '@/components/modals/DeleteModal';
import moment from 'moment';



const Budgets: FC = () => {

    const dispatch = useAppDispatch() // Action Dispatcher
    const messenger = useMessage() // Message Toaster

    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0, }); //Pagination

    const [budgets, setBudgets] = useState<Budget[]>([])
    const [budgetAdded, setBudgetAdded] = useState<boolean>(false);
    const [budgetDeleted, setBudgetDeleted] = useState<boolean>(false);
    const [budgetUpdated, setBudgetUpdated] = useState<boolean>(false);
    const [currentBudget, setCurrentBudget] = useState<number>(0)

    useEffect(() => {
        //Get all budgets
        dispatch(getBudgets({
            page: pagination.current,
            limit: pagination.pageSize
        })).then((response) => {
            if (response) {
                //@ts-ignore
                if (response.payload.status === 200) {
                    //@ts-ignore
                    const availableBudgets = response.payload.data.rows
                    setCurrentBudget(availableBudgets[0].amount)
                    setBudgets(availableBudgets)
                    setLoading(false)

                    // update pagination
                    setPagination({
                        ...pagination,
                        //@ts-ignore
                        current: response.payload.data.page,
                        //@ts-ignore
                        total: response.payload.data.count,
                        pageSize: pagination.pageSize,
                    })
                } else {
                    setBudgets([])
                }
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [budgetAdded, budgetDeleted, budgetUpdated])

    // get budgets on pagination change
    const handleTableChange = (pagination: TablePaginationConfig) => {

        setLoading(true)

        //get Pagination
        dispatch(getBudgets({
            page: pagination.current,
            limit: pagination.pageSize
        })).then((response) => {

            if (response) {
                //@ts-ignore
                if (response.payload?.status === 200) {
                    //@ts-ignore
                    const availableBudgets = response.payload.data.rows
                    setBudgets(availableBudgets)
                    setLoading(false)

                    // update pagination
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
                    setBudgets([])
                }

            }
        })
    };

    // Delete budget delete function
    const handleDelete = (id: string) => {
        setLoading(true)
        setBudgetDeleted(true)
        dispatch(deleteBudget({ id: id })).then((response) => {
            if (response) {
                //@ts-ignore
                if (response.payload?.status === 200) {
                    messenger.success(response.payload.message)
                    setLoading(false)
                    setBudgetDeleted(false)
                } else {
                    setLoading(false)
                    setBudgetDeleted(false)
                    //@ts-ignore
                    messenger.warning(response.payload.message)
                }
            }
        })
    }

    // Table columns definitions
    const columns: TableProps<Budget>['columns'] = [
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
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
                <UpdateBudgetModal
                    budgetId={value.id}
                    amount={value.amount}
                    setBudgetUpdated={setBudgetUpdated}
                />

                <DeleteModal
                    title={`Do you want to delete this budget?`}
                    content={`Budget Amount: ${value.amount}`}
                    onODelete={handleDelete}
                    id={value.id}
                    loading={loading} />
            </div>
        },
    ];

    return (
        <div className="max-w-3xl 2xl:max-w-5xl mx-auto my-auto">
            <div className="flex justify-around items-center mb-10">
                {/* Path History */}
                <BreadCrumbs data={[
                    { title: 'DASHBOARD', href: '/wallet/budgets' },
                    { title: 'BUDGETS' }]} />
                {/*Set Budget Modal*/}
                <SetBudgetModal setBudgetAdded={setBudgetAdded} />
            </div>

            {/*Show buget info using slider*/}
            <div className='bg-white p-2 shadow-2xl border border-gray-200 mb-4'>
                <BudgetSlider currentBudget={currentBudget} />
            </div>

            {/*Budgets Table*/}
            <DataTable<Budget>
                columns={columns}
                data={budgets}
                rowKey='id'
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
                showCheckbox={false}
                title='BUDGETS'
            />
        </div>
    )
}

export default Budgets