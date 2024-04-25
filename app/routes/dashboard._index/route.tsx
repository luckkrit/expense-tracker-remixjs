import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Budgets, Expenses } from "~/database/types";
import * as BudgetRepository from '../../database/BudgetRepository'
import * as ExpenseRepository from '../../database/ExpenseRepository'
import authenticator from '~/services/auth.server'
import { CardInfo } from "./CardInfo";
import { BarChartDashboard } from "./BarChartDashboard";
import { BudgetItem } from "../dashboard.budgets/BudgetItem";
import { ExpenseListTable } from "../dashboard.expenses.$id/ExpenseListTable";
export default function () {
    const data = useLoaderData<typeof loader>()
    return (
        <div className="p-8">
            <h2 className="font-bold text-3xl">Hi, {data.profile.displayName} ✌️</h2>
            <p className="text-gray-500">Let's manage your budgets and expenses</p>
            <CardInfo budgets={data.budgets} expenses={data.expenses} />
            <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
                <div className="md:col-span-2">
                    <BarChartDashboard budgets={data.budgets} />

                    <ExpenseListTable expenses={data.expenses} />
                </div>
                <div className="grid gap-5">
                    <h2 className="font-bold text-lg">Latest Budgets</h2>
                    {data.budgets.map((budget) => (<BudgetItem budget={budget} key={budget.id} />))}
                </div>
            </div>
        </div>
    );
}
export const loader = async ({ request }: LoaderFunctionArgs) => {
    const profile = await authenticator.isAuthenticated(request)

    let budgets: Budgets[] = []
    let expenses: Expenses[] = []
    if (profile === null) return redirect('/')
    if (profile?.emails) {
        const budgetResults = await BudgetRepository.findBudgetByCreatedBy({ createdBy: profile.emails[0].value })
        budgets = budgetResults.rows
    }
    if (budgets.length === 0) {
        return redirect('/dashboard/budgets')
    }
    for (let i = 0; i < budgets.length; i++) {
        const exps = await ExpenseRepository.findExpense({ budgetsId: budgets[i].id })
        expenses = [...expenses, ...exps]
    }
    return { profile, budgets, expenses };
};
