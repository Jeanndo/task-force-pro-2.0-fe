/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React, { FC, useEffect, useState} from 'react'
import { Skeleton } from "antd"
import AnalyticsBudgetSlider from './BugetSlider';
import { Card } from '@tremor/react';
import { DollarCircleOutlined } from '@ant-design/icons';
import { getBudgets } from '@/redux/features/budgetSlice';
import { useAppDispatch } from '@/lib/hooks';
import { formatMoney } from '@/lib/utils';
import { TotalIncomeAndExpenses } from '@/lib/Interfaces';

interface CardProps {
    loading?: boolean;
    title: string;
    totalInAndOut: TotalIncomeAndExpenses
}


const BudgetCard: FC<CardProps> = ({ loading,title,totalInAndOut}) => {
    
    const dispatch = useAppDispatch()
    const [currentBudget, setCurrentBudget] = useState<number>(0)

    useEffect(() => {
            dispatch(getBudgets({})).then((response) => {
                if (response) {
                    //@ts-ignore
                    if (response.payload.status === 200) {
                        //@ts-ignore
                        const availableBudgets = response.payload.data.rows
                        setCurrentBudget(availableBudgets[0].amount)
                        
                    } else {
                        setCurrentBudget(0)
                    }
                }
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    
    
    return (
        <>
            {loading ? <Skeleton avatar paragraph={{ rows: 2 }} /> :
                <Card
                    className=" p-2 rounded-sm !bg-white"
                >
                    <div className='flex justify-around items-center'>
                    <div className=" flex justify-center items-center p-1 rounded-full font-bold text-xl h-10 w-10 bg-blue-500"><DollarCircleOutlined className="!text-white"/></div>
                        <div className="text-lg text-center  text-blue-500 font-semibold">
                        {title}
                        </div>
                        <div className="font-semibold">{ formatMoney({amount:currentBudget,currency:'RWF',locale:'en-US'})}</div>
                    </div>
                    <AnalyticsBudgetSlider currentBudget={currentBudget} totalInAndOut={totalInAndOut}/>
                </Card>}
        </>
    )
}

export default BudgetCard
