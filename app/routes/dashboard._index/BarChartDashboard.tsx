import React from 'react'
import { BarChartDashboardProps } from '~/global'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export const BarChartDashboard = ({ budgets }: BarChartDashboardProps) => {
    console.log(budgets)
    return (
        <div className='w-full h-[300px] border rounded-lg p-5'>
            <h2 className='font-bold text-lg'>Activity</h2>
            <ResponsiveContainer>
                <BarChart data={budgets} margin={{ top: 14, bottom: 14 }}>
                    <XAxis dataKey={'name'} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={'totalSpend'} stackId={"a"} fill='#4845D2' />
                    <Bar dataKey={'amount'} stackId={"a"} fill='#C3C2FF' />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
