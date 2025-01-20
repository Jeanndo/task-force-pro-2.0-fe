'use client'
import React, { FC, useState } from 'react';
import { Slider } from 'antd';
import { TotalIncomeAndExpenses } from '@/lib/Interfaces';

type SliderProps = {
    currentBudget:number;
    totalInAndOut: TotalIncomeAndExpenses
}


const AnalyticsBudgetSlider: FC<SliderProps> = ({currentBudget,totalInAndOut}) => {

    const [budget, setBudget] = useState<number>(totalInAndOut.Expense);
    const minLimit = 0;

    const handleSliderChange = (value: number) => {
        setBudget(value);
    };

    return (
        <>
            <Slider
                min={minLimit}
                max={currentBudget}
                onChange={handleSliderChange}
                value={budget}
                tooltip={{ formatter: (value) => `${value} FRW` }}
            />
            <div>{budget} FRW</div>
        </>
    );
}

export default AnalyticsBudgetSlider;