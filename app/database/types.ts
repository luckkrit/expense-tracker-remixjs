import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface BudgetsTable {
    id: Generated<number>
    name: string
    amount: string
    icon: string
    createdBy: string
}
export type Budgets = Selectable<BudgetsTable>
export type NewBudgets = Insertable<BudgetsTable>
export type BudgetsUpdate = Updateable<BudgetsTable>
export interface Database {
    budgets: BudgetsTable
}