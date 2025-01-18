import React, { FC, ReactNode } from 'react'
import { Skeleton } from "antd"
import { Card } from '@tremor/react';
interface CardProps {
    title: string;
    metrics: string | number;
    icon: ReactNode;
    loading?: boolean;
}

const AnalyticsCard: FC<CardProps> = ({ title, metrics, icon, loading }) => {
    return (
        <>
            {loading ? <Skeleton avatar paragraph={{ rows: 2 }} /> :
                <Card
                    className="p-3.5 rounded-sm"
                    // decoration="top"
                    // decorationColor="indigo"
                >
                    <div className='flex justify-around items-center mb-4'>
                        <div className=" flex justify-center items-center p-1 rounded-full font-bold text-xl h-10 w-10 bg-blue-500 text-white">{icon}</div>
                        <div className="text-lg text-center  text-blue-500 font-semibold dark:text-white">
                            {title}
                        </div>
                        <div className="dark:text-white font-semibold">10 Accounts</div>
                    </div>
                    <span className="text-lg block text-center font-bold text-gray-700 dark:text-white">
                        {metrics}
                    </span>
                </Card>}
        </>
    )
}

export default AnalyticsCard
