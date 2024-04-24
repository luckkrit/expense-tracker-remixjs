import { json, type ActionFunctionArgs } from "@remix-run/node";
import * as BudgetRepository from "../database/BudgetRepository";
import authenticator from "~/services/auth.server";

export const action = async ({ request, }: ActionFunctionArgs) => {
    const profile = await authenticator.isAuthenticated(request)
    if (profile !== null) {

        const formData = await request.formData();
        const amount = String(formData.get("amount"));
        const name = String(formData.get('name'))
        const icon = String(formData.get('icon'))
        await BudgetRepository.createBudget({ name, icon, createdBy: profile?.emails[0].value, amount })
        return json({ error: null })
    }
    return json({ error: 'User not found' })
}



