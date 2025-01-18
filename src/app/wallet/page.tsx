'use client'
import React, { FC, useState } from 'react'
import AnalyticsCard from '@/components/Analytics/AnalysisCard'
import { formatMoney } from '@/lib/utils'
import { DollarCircleOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import BudgetCard from '@/components/Analytics/BudgetCard'
import { BalanceSummaryChart } from '@/components/Analytics/BalanceSummary'
import { PieChartForIncomeAndExpense } from '@/components/Analytics/WalletPieChart'
import CurrentTransactions from '@/components/CurrentTransactions/CurrentTransactions'


const WalletDashboard: FC = () => {

    const [loading, setLoading] = useState<boolean>(false)

    return (
        <div className="max-w-5xl 2xl:max-w-7xl mx-auto my-auto">
            <Row gutter={[16,8]}>
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
                <Row gutter={[16,8]}>
                <Col className="gutter-row" xs={24} sm={16}>
                <BalanceSummaryChart/>
                </Col>
                <Col className="gutter-row" xs={24} sm={8}>
                <PieChartForIncomeAndExpense/>
                </Col>
                </Row>
            
            </div>
            <div className="w-full mt-5">
                <CurrentTransactions/>
            </div>
        </div>
    )
}

export default WalletDashboard