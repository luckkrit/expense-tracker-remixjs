import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Expenses } from '~/database/types';
import * as ExpenseRepository from '../../database/ExpenseRepository'
import authenticator from '~/services/auth.server';
import { useLoaderData } from '@remix-run/react';
import { ExpenseListTable } from '../dashboard.expenses.$id/ExpenseListTable';

export default function () {
    const data = useLoaderData<typeof loader>()
    return (
        <div className='p-10'>
            <h2 className="font-bold text-3xl">My Budgets</h2>
            <div className="mt-4">

                <ExpenseListTable expenses={data.expenses} />
            </div>
        </div>
    )
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const profile = await authenticator.isAuthenticated(request)
    if (profile === null) return redirect('/')
    let expenses: Expenses[] = await ExpenseRepository.findExpense({})
    return { expenses };
};
