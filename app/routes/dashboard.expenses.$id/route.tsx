import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import * as BudgetRepository from "../../database/BudgetRepository"
import * as ExpenseRepository from "../../database/ExpenseRepository"
import z from 'zod'
import { Budgets, Expenses } from "~/database/types";
import authenticator from "~/services/auth.server";
import { BudgetItem } from "../dashboard.budgets/BudgetItem";
import { useEffect, useState } from "react";
import { BudgetItemSkeleton } from "../dashboard.budgets/BudgetItemSkeleton";
import { AddExpense } from "./AddExpense";
import { ExpenseListTable } from "./ExpenseListTable";
import { ExpenseSkeleton } from "./ExpenseSkeleton";
import { Button } from "~/components/ui/button";
import { PenBox, Trash } from "lucide-react";
import { DeleteBudget } from "./DeleteBudget";
import { toast } from "~/components/ui/use-toast";
import { EditBudget } from "./EditBudget";

export default function () {
    const data = useLoaderData<typeof loader>()

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(() => false)
        }, 1000)
    }, [])
    return (
        <div className="p-10">
            <h2 className="text-2xl font-bold flex justify-between items-center">My Expenses
                <div className="flex gap-2">

                    <DeleteBudget budgetId={data.budget.id} />
                    <EditBudget budget={data.budget} />
                </div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
                {isLoading ?
                    <BudgetItemSkeleton />
                    :
                    <BudgetItem budget={data.budget} />
                }
                <AddExpense budgetId={data.budget.id} />
            </div>
            <div className="mt-4">
                {isLoading ?
                    <ExpenseSkeleton />
                    :
                    <ExpenseListTable expenses={data.expenses} />
                }
            </div>
        </div>
    );
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
    let budget: Budgets | undefined = undefined
    let expenses: Expenses[] = []
    try {
        const profile = await authenticator.isAuthenticated(request)
        if (profile === null) throw new Response(null, {
            status: 401,
            statusText: "Unauthorized"
        })

        const budgetId = z.coerce.number().parse(params.id)
        const budgetResult = await BudgetRepository.findBudgetByCreatedBy({ id: budgetId, createdBy: profile.emails[0].value })
        if (budgetResult.rows.length === 0) {
            return redirect('/dashboard/budgets')
        } else {

            budget = budgetResult.rows[0]
            expenses = await ExpenseRepository.findExpense({ budgetsId: budgetId })
            return { budget, expenses };
        }
    } catch (e) {
        throw new Response(null, {
            status: 404,
            statusText: "Not Found",
        });
    }
};

