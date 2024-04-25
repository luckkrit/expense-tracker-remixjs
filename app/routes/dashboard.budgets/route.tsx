import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { BudgetList } from "./BudgetList";
import * as BudgetRepository from '../../database/BudgetRepository'
import authenticator from "~/services/auth.server";
import { Budgets } from "~/database/types";
import { useLoaderData } from "@remix-run/react";
export default function () {
    const data = useLoaderData<typeof loader>()
    return (
        <div className="p-10">
            <h2 className="font-bold text-3xl">My Budgets</h2>
            <BudgetList budgets={data.budgets} />
        </div>
    );
}


export const loader = async ({ request }: LoaderFunctionArgs) => {
    const profile = await authenticator.isAuthenticated(request)
    let budgets: Budgets[] = []
    if (profile !== null && profile.emails.length > 0) {
        const result = await BudgetRepository.findBudgetByCreatedBy({ createdBy: profile.emails[0].value })
        budgets = result.rows
    }
    return json({ budgets });
};
