/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React, { FC, useEffect, useState } from 'react'
import AnalyticsCard from '@/components/Analytics/AnalysisCard'
import { DollarCircleOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import BudgetCard from '@/components/Analytics/BudgetCard'
import { BalanceSummaryChart } from '@/components/Analytics/BalanceSummary'
import { PieChartForIncomeAndExpense } from '@/components/Analytics/WalletPieChart'
import CurrentTransactions from '@/components/CurrentTransactions/CurrentTransactions'
import { useAppDispatch, useMessage } from '@/lib/hooks'
import { getTotalIncomeTotalExpenses, getTransactionsSummary } from '@/redux/features/transactionSlice'
import { TotalIncomeAndExpenses, TransactionSummary } from '@/lib/Interfaces'

//Dashboard page
const WalletDashboard: FC = () => {

    const dispatch = useAppDispatch() // dispatcher
    const messenger = useMessage() //message toaster
    const [loading, setLoading] = useState<boolean>(false)
    const [transactionsSummary, setTransactionsSummary] = useState<TransactionSummary[]>([])
    const [totalInAndOut,setTotalInAndOut] = useState<TotalIncomeAndExpenses>({
        Income:0,
        Expense:0
    })

    // transaction summary
    useEffect(() => {
        setLoading(true)
        dispatch(getTransactionsSummary()).then((response) => {
            if (response) {
                //@ts-ignore
                if (response.payload.status === 200) {
                    //@ts-ignore
                    const availableSummary = response.payload.data
                    setTransactionsSummary(availableSummary)
                    setLoading(false)
                } else {
                    //@ts-ignore
                    messenger.error(response.payload.message)
                    setLoading(false)
                }

            }

        })

        // Total expenses Amount and Total Income Amount
        dispatch(getTotalIncomeTotalExpenses()).then((response)=>{
            if (response) {
                //@ts-ignore
                if (response.payload.status === 200) {
                    //@ts-ignore
                    const availableInAndOuts = response.payload.data
                    setTotalInAndOut(availableInAndOuts)
                    setLoading(false)
                } else {
                    //@ts-ignore
                    messenger.error(response.payload.message)
                    setLoading(false)
                    setTotalInAndOut({Income:0,Expense:0})
                }

            }

        })
    }, [])

    return (
        <div className="max-w-5xl 2xl:max-w-7xl mx-auto my-auto">
            <Row gutter={[16, 8]}>
                <Col className="gutter-row" xs={24} sm={12}>
                    {/*Global balance Card*/}
                    <AnalyticsCard 
                        title={"Global Balance"}
                        icon={<DollarCircleOutlined />}
                        loading={loading}
                    />
                </Col>
                <Col className="gutter-row" xs={24} sm={12}>
                {/*Current Budegt Card*/}
                    <BudgetCard
                        title={"Current Budegt"}
                        loading={loading}
                        totalInAndOut={totalInAndOut}
                    />
                </Col>

            </Row>
            <div className="w-full mt-5">
                <Row gutter={[16, 8]}>
                    <Col className="gutter-row" xs={24} sm={24} md={24} lg={16}>
                        {/*Transactions Summary*/}
                        <BalanceSummaryChart transactionsSummary={transactionsSummary} />
                    </Col>
                    <Col className="gutter-row" xs={24} sm={24} md={24} lg={8}>
                        {/*Income and Expense summary*/}
                        <PieChartForIncomeAndExpense totalInAndOut={totalInAndOut} />
                    </Col>
                </Row>

            </div>
            <div className="w-full mt-5">
                {/*Current Transactions*/}
                <CurrentTransactions />
            </div>
        </div>
    )
}

export default WalletDashboard