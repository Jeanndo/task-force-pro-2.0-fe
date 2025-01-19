import { TotalIncomeAndExpenses } from '@/lib/Interfaces';
import { formatMoney } from '@/lib/utils';
import { Card, DonutChart, Legend } from '@tremor/react';
import { FC } from 'react';



const dataFormatter = (number: number) => formatMoney({ amount: number, currency: 'RWF', locale: 'en-US' });

type ChartProps = {
    totalInAndOut: TotalIncomeAndExpenses
}

export const PieChartForIncomeAndExpense: FC<ChartProps> = ({ totalInAndOut }) => {

    const chartData = [
        {
            name: 'Expense',
            value: totalInAndOut.Expense,
        },
        {
            name: 'Income',
            value: totalInAndOut.Income,
        },
    ];

    return (
        <Card className="p-2 !bg-white">
            <div className="flex flex-col gap-y-4 justify-center items-center">
                <DonutChart
                    data={chartData}
                    variant="pie"
                    valueFormatter={dataFormatter}
                    colors={["red", "blue"]}
                    className="w-[250px] h-[250px]"
                    showAnimation={true}
                    animationDuration={1500}

                />
                <Legend
                    categories={["Expense", "Income"]}
                    colors={["red", "blue"]}
                    className='uppercase'
                />
            </div>
        </Card>
    )
}