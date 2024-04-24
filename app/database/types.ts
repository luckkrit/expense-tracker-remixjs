import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface BudgetsTable {
    id: Generated<number>
    name: string
    amount: string
    icon: string
    totalSpend?: string
    totalItem?: string
    createdBy: string
}
export type Budgets = Selectable<BudgetsTable>
export type NewBudgets = Insertable<BudgetsTable>
export type BudgetsUpdate = Updateable<BudgetsTable>

export interface ExpensesTable {
    id: Generated<number>
    name: string
    amount: string
    budgetsId: number
    createdBy: string
}
export type Expenses = Selectable<ExpensesTable>
export type NewExpenses = Insertable<ExpensesTable>
export type ExpensesUpdate = Updateable<ExpensesTable>

export interface Database {
    budgets: BudgetsTable
    expenses: ExpensesTable
}