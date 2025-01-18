'use client'
import React, { FC, useState } from 'react';
import { Slider } from 'antd';


const AnalyticsBudgetSlider: FC = () => {

    const [budget, setBudget] = useState<number>(40000);
    const minLimit = 0;
    const maxLimit = 100000;

    const handleSliderChange = (value: number) => {
        setBudget(value);
    };

    return (
        <>
            <Slider
                min={minLimit}
                max={maxLimit}
                onChange={handleSliderChange}
                value={budget}
                tooltip={{ formatter: (value) => `${value} FRW` }}
            />
            <div>{budget} FRW</div>
        </>
    );
}

export default AnalyticsBudgetSlider;