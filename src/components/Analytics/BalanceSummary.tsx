"use client"

import { AreaChart, Card } from '@tremor/react';

const chartdata = [
    {
        date: "Jan 23",
        Income: 2890,
        Expenses: 2338,
    },
    {
        date: "Feb 23",
        Income: 2756,
        Expenses: 2103,
    },
    {
        date: "Mar 23",
        Income: 3322,
        Expenses: 2194,
    },
    {
        date: "Apr 23",
        Income: 3470,
        Expenses: 2108,
    },
    {
        date: "May 23",
        Income: 3475,
        Expenses: 1812,
    },
    {
        date: "Jun 23",
        Income: 3129,
        Expenses: 1726,
    },
    {
        date: "Jul 23",
        Income: 3490,
        Expenses: 1982,
    },
    {
        date: "Aug 23",
        Income: 2903,
        Expenses: 2012,
    },
    {
        date: "Sep 23",
        Income: 2643,
        Expenses: 2342,
    },
    {
        date: "Oct 23",
        Income: 2837,
        Expenses: 2473,
    },
    {
        date: "Nov 23",
        Income: 2954,
        Expenses: 3848,
    },
    {
        date: "Dec 23",
        Income: 3239,
        Expenses: 3736,
    },
]

const dataFormatter = (number: number) =>
    `$${Intl.NumberFormat('us').format(number).toString()}`;



export const BalanceSummaryChart = () => (
    <Card
        className="!w-full p-2"
    // decoration="top"
    // decorationColor="indigo"
    >
        <AreaChart
            className="h-72"
            data={chartdata}
            index="date"
            categories={['Income', 'Expenses']}
            colors={['blue', 'red']}
            valueFormatter={dataFormatter}
            yAxisWidth={60}
        />
    </Card>

)