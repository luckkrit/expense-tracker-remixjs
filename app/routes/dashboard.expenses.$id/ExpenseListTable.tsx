import { Trash } from 'lucide-react'
import { Expenses } from '~/database/types'
import { ExpenseListTableProps } from '~/global'
import dayjs from 'dayjs'
import { useFetcher, useNavigate } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { toast } from '~/components/ui/use-toast'

export const ExpenseListTable = ({ expenses }: ExpenseListTableProps) => {
    const fetcher = useFetcher()
    const [error, setError] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        if (fetcher.data !== undefined && fetcher.state === 'loading') {
            const data: any = fetcher.data
            if (data['error'] === null) {
                toast({
                    title: "Delete Expense",
                    description: "Success",
                })
            } else {
                setError(() => data['error'])
                toast({
                    title: "Delete Expense",
                    description: data['error'],
                    variant: 'destructive'
                })
            }
        }
    }, [fetcher.data])
    return (
        <div>
            <h2 className="font-bold text-lg">Latest Expenses</h2>
            <div className='mt-3'>
                <div className='grid grid-cols-4 bg-slate-200 p-2'>

                    <h2>Name</h2>
                    <h2>Amount</h2>
                    <h2>Date</h2>
                    <h2>Action</h2>
                </div>
                {expenses.map((expense: Expenses, i: number) => (
                    <div key={i} className={`grid grid-cols-4 p-2`}>
                        <h2>{expense.name}</h2>
                        <h2>{expense.amount}</h2>
                        <h2>{dayjs(expense.created_at).format('DD/MM/YYYY')}</h2>
                        <h2>
                            <fetcher.Form method='post' action={`/dashboard/expenses/${expense.id}/delete`}>
                                <button>
                                    <Trash className='text-red-600' />
                                </button>
                            </fetcher.Form>
                        </h2>

                    </div>
                ))}
                {expenses.length === 0 ? <div className='grid grid-cols-1 p-2 bg-slate-50 text-center'>No expenses found</div> : null}
            </div>
        </div>
    )
}
