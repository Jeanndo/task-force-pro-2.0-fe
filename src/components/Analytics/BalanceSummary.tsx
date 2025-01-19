"use client"

import { TransactionSummary } from '@/lib/Interfaces';
import { formatMoney } from '@/lib/utils';
import { AreaChart, Card } from '@tremor/react';
import { FC } from 'react';


const dataFormatter = (number: number) => formatMoney({amount:number,currency:'RWF',locale:'en-US'})


type ChartProps = {
    transactionsSummary:TransactionSummary[]
}

export const BalanceSummaryChart:FC<ChartProps> = ({transactionsSummary}) => (
    <Card
        className="!bg-white p-2 "
    >
        <AreaChart
            showAnimation
            animationDuration={1500}
            className="h-72"
            data={transactionsSummary}
            index="date"
            categories={['Income', 'Expense']}
            colors={['blue', 'red']}
            valueFormatter={dataFormatter}
            yAxisWidth={60}
            showGridLines={false}
        />
    </Card>

)