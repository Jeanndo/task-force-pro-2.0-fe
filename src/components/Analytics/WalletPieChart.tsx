import { Card, DonutChart, Legend } from '@tremor/react';

const datahero = [
    {
        name: 'Expenses',
        value: 9800,
    },
    {
        name: 'Income',
        value: 4567,
    },
];

const dataFormatter = (number: number) =>
    `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export const PieChartForIncomeAndExpense = () => (
    <Card className="p-2">
        <div className="flex flex-col gap-y-4 justify-center items-center">
            <DonutChart
                data={datahero}
                variant="pie"
                valueFormatter={dataFormatter}
                colors={["red","blue"]}
                className="w-[250px] h-[250px]"
                
            />
            <Legend
                categories={["Expenses","Income"]}
                colors={["red","blue"]}
                className='uppercase dark:text-white'
            />
        </div>
    </Card>
);