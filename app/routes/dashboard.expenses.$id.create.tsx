import { json, type ActionFunctionArgs } from "@remix-run/node";
import authenticator from "~/services/auth.server";
import * as ExpenseRepository from '../database/ExpenseRepository'
import * as BudgetRepository from '../database/BudgetRepository'
import z from 'zod'

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const profile = await authenticator.isAuthenticated(request)
    if (profile !== null) {
        try {
            const budgetsId = z.coerce.number().parse(params.id)
            const budget = await BudgetRepository.findBudgetByCreatedBy({ createdBy: profile.emails[0].value, id: budgetsId })
            if (budget === undefined) {
                return json({ error: 'Budget not found' })
            }
            const formData = await request.formData();
            const amount = String(formData.get("amount"));
            const name = String(formData.get('name'))
            const totalSpend = budget.rows[0].totalSpend
            const budgetAmount = budget.rows[0].amount

            if (Number(amount) < 0) {
                return json({ error: 'Expense amount must be positive' })
            }
            if (totalSpend !== undefined && budgetAmount !== undefined && (Number(totalSpend) + Number(amount)) <= Number(budgetAmount)) {

                await ExpenseRepository.createExpense({ name, amount, budgetsId, createdBy: profile.emails[0].value })
                return json({ error: null })
            } else {
                return json({ error: 'Expense amount exceed' })
            }
        } catch (e) {
            return json({ error: e })
        }
    }
    return json({ error: 'User not found' })
};
