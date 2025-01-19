/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React, { FC, useEffect, useState } from 'react'
import AnalyticsCard from '@/components/Analytics/AnalysisCard'
import { formatMoney } from '@/lib/utils'
import { DollarCircleOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import BudgetCard from '@/components/Analytics/BudgetCard'
import { BalanceSummaryChart } from '@/components/Analytics/BalanceSummary'
import { PieChartForIncomeAndExpense } from '@/components/Analytics/WalletPieChart'
import CurrentTransactions from '@/components/CurrentTransactions/CurrentTransactions'
import { useAppDispatch, useMessage } from '@/lib/hooks'
import { getTotalIncomeTotalExpenses, getTransactionsSummary } from '@/redux/features/transactionSlice'
import { TotalIncomeAndExpenses, TransactionSummary } from '@/lib/Interfaces'


const WalletDashboard: FC = () => {

    const dispatch = useAppDispatch()
    const messenger = useMessage()
    const [loading, setLoading] = useState<boolean>(false)
    const [transactionsSummary, setTransactionsSummary] = useState<TransactionSummary[]>([])
    const [totalInAndOut,setTotalInAndOut] = useState<TotalIncomeAndExpenses>({
        Income:0,
        Expense:0
    })

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
                    <AnalyticsCard
                        title={"Global Balance"}
                        icon={<DollarCircleOutlined />}
                        metrics={formatMoney({ amount: 1000, currency: "RWF", locale: "en-US" })}
                        loading={loading}
                    />
                </Col>
                <Col className="gutter-row" xs={24} sm={12}>
                    <BudgetCard
                        title={"Current Budegt"}
                        loading={loading}
                    />
                </Col>

            </Row>
            <div className="w-full mt-5">
                <Row gutter={[16, 8]}>
                    <Col className="gutter-row" xs={24} sm={24} md={24} lg={16}>
                        <BalanceSummaryChart transactionsSummary={transactionsSummary} />
                    </Col>
                    <Col className="gutter-row" xs={24} sm={24} md={24} lg={8}>
                        <PieChartForIncomeAndExpense totalInAndOut={totalInAndOut} />
                    </Col>
                </Row>

            </div>
            <div className="w-full mt-5">
                <CurrentTransactions />
            </div>
        </div>
    )
}

export default WalletDashboard