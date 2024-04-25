import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, type ActionFunctionArgs } from "@remix-run/node";
import * as BudgetRepository from '../database/BudgetRepository'
import * as ExpenseRepository from '../database/ExpenseRepository'
import z from 'zod'
import authenticator from "~/services/auth.server";

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const profile = await authenticator.isAuthenticated(request)
    if (profile !== null) {
        try {
            const budgetsId = z.coerce.number().parse(params.id)
            await BudgetRepository.deleteBudget(budgetsId)
            await ExpenseRepository.deleteExpenseByBudget(budgetsId)
            return json({ error: null })
        } catch (e) {
            return json({ error: e })
        }
    }
    return json({ error: 'User not found' })
};

