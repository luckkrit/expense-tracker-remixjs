import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Budgets } from "~/database/types";
import * as BudgetRepository from '../../database/BudgetRepository'
import authenticator from '~/services/auth.server'
export default function () {
    const data = useLoaderData<typeof loader>()
    return (
        <div>
            Dashboard {data.profile.displayName}
        </div>
    );
}
export const loader = async ({ request }: LoaderFunctionArgs) => {
    const profile = await authenticator.isAuthenticated(request)
    if (profile === null) return redirect('/')

    if (profile === null) return redirect('/')
    let budgets: Budgets[] = []
    if (profile?.emails) {
        budgets = await BudgetRepository.findBudget({ createdBy: profile.emails[0].value })
        console.log(budgets.length)
    }
    if (budgets.length === 0) {
        return redirect('/dashboard/budgets')
    }
    return { profile, budgets };
};
