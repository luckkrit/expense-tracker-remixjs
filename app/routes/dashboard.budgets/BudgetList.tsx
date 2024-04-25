import React, { useEffect, useState } from 'react'
import { CreateBudget } from './CreateBudget'
import { BudgetListProps } from '~/global'
import { BudgetItem } from './BudgetItem'
import { Budgets } from '~/database/types'
import { BudgetItemSkeleton } from './BudgetItemSkeleton'

export const BudgetList = ({ budgets }: BudgetListProps) => {
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(() => false)
        }, 1000)
    }, [])
    return (
        <div className='mt-7'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <CreateBudget />
                {isLoading ? Array.from({ length: 6 }, (_, i) => (i)).map((i) => <BudgetItemSkeleton key={i} />) :
                    budgets.map((budget: Budgets) => (<BudgetItem budget={budget} key={budget.id} />))
                }
            </div>
        </div>
    )
}
