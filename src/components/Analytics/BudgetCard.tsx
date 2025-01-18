import React, { FC} from 'react'
import { Skeleton } from "antd"
import AnalyticsBudgetSlider from './BugetSlider';
import { Card } from '@tremor/react';
import { DollarCircleOutlined } from '@ant-design/icons';

interface CardProps {
    loading?: boolean;
    title: string;
}

const BudgetCard: FC<CardProps> = ({ loading,title}) => {
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
                        <div className="font-semibold">1000000 FRW</div>
                    </div>
                    <AnalyticsBudgetSlider/>
                </Card>}
        </>
    )
}

export default BudgetCard
