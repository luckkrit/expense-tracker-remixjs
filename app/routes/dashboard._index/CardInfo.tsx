import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import { CardInfoProps } from '~/global'
import { Expenses, Budgets } from '~/database/types'
import { useEffect, useState } from 'react'
import { CardSkeleton } from './CardSkeleton'

export const CardInfo = ({ expenses, budgets }: CardInfoProps) => {

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(() => false)
        }, 1000)
    }, [])
    return (
        isLoading ?
            <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {

                    Array.from({ length: 3 }, (_, i) => i).map((i) => (<CardSkeleton key={i} />))
                }
            </div>
            :

            <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                <div className='p-7 border rounded-lg flex items-center justify-between'>
                    <div>
                        <h2 className="text-sm">Total Budget</h2>
                        <h2 className="font-bold text-2xl">${budgets.reduce((ac: number, v: Budgets) => (ac + Number(v.amount)), 0)}</h2>
                    </div>
                    <PiggyBank className='bg-blue-700 p-3 h-12 w-12 rounded-full text-white' />
                </div>
                <div className='p-7 border rounded-lg flex items-center justify-between'>
                    <div>
                        <h2 className="text-sm">Total Spend</h2>
                        <h2 className="font-bold text-2xl">${budgets.reduce((ac: number, v: Budgets) => (ac + Number(v.totalSpend)), 0)}</h2>
                    </div>
                    <ReceiptText className='bg-blue-700 p-3 h-12 w-12 rounded-full text-white' />
                </div>
                <div className='p-7 border rounded-lg flex items-center justify-between'>
                    <div>
                        <h2 className="text-sm">No. Items</h2>
                        <h2 className="font-bold text-2xl">{budgets.length}</h2>
                    </div>
                    <Wallet className='bg-blue-700 p-3 h-12 w-12 rounded-full text-white' />
                </div>
            </div>

    )
}
