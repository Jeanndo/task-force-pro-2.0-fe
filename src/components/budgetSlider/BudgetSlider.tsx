'use client'
import React, { FC, useState } from 'react';
import { Slider } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

type SliderProps = {
    currentBudget:number;
}
const BudgetSlider: FC<SliderProps> = ({currentBudget}) => {

    const [budget, setBudget] = useState<number>(1000);
    const minLimit = 0;

    const handleSliderChange = (value: number) => {
        setBudget(value);
    };

    return (
        <>
            <div>
                <h2 className="mb-4 text-gray-500">Current Budget, 2025-01-01 <ArrowRightOutlined /> 2025-01-31</h2>
                <div className='flex justify-between items-center'>
                    <div className='font-medium'>Current Spend: {budget} FRW</div>
                    <div className='font-medium'>{currentBudget} FRW</div>
                </div>
            </div>
            <Slider
                min={minLimit}
                max={currentBudget}
                onChange={handleSliderChange}
                value={budget}
                tooltip={{ formatter: (value) => `${value} FRW`, open: true }}
            />
        </>
    );
}

export default BudgetSlider;