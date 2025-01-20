/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC, ReactNode, useEffect, useState } from 'react'
import { Skeleton } from "antd"
import { Card } from '@tremor/react';
import { useAppDispatch } from '@/lib/hooks';
import { getAccounts } from '@/redux/features/accountSlice';
import { Account } from '@/lib/Interfaces';
import { formatMoney } from '@/lib/utils';
interface CardProps {
    title: string;
    icon: ReactNode;
    loading?: boolean;
}

const AnalyticsCard: FC<CardProps> = ({ title, icon, loading }) => {
    const dispatch = useAppDispatch()

    const [accounts,setAccounts] = useState<number>(0)
    const [globalBalance,setGlobalBalance] = useState<number>(0)

    useEffect(()=>{
        dispatch(getAccounts({})).then((response)=>{
            if(response){
                //@ts-ignore
                if(response.payload?.status===200){
                    //@ts-ignore
                    const availableAccounts = response.payload.data.rows
                    const totalBalance = availableAccounts.reduce((acc:number, account:Account)=>acc+account.balance,0)
                    setGlobalBalance(totalBalance)
                    setAccounts(availableAccounts.length)
                }else{
                    setAccounts(0)
                }
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return (
        <>
            {loading ? <Skeleton avatar paragraph={{ rows: 2 }} /> :
                <Card
                    className="p-3.5 rounded-sm !bg-white"
                >
                    <div className='flex justify-around items-center mb-4'>
                        <div className=" flex justify-center items-center p-1 rounded-full font-bold text-xl h-10 w-10 bg-blue-500 text-white">{icon}</div>
                        <div className="text-lg text-center  text-blue-500 font-semibold">
                            {title}
                        </div>
                        <div className="font-semibold">{accounts} Accounts</div>
                    </div>
                    <span className="text-lg block text-center font-bold text-gray-700">
                        {formatMoney({amount:globalBalance,currency:'RWF',locale:'en-US'})}
                    </span>
                </Card>}
        </>
    )
}

export default AnalyticsCard
