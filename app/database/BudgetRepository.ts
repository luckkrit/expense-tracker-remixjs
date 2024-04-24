import { db } from './'
import { BudgetsUpdate, Budgets, NewBudgets } from './types'
import { sql } from 'kysely'

export async function findBudgetById(id: number) {
    return await db.selectFrom('budgets')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
}

export async function findBudget(criteria: Partial<Budgets>) {
    let query = db.selectFrom('budgets')

    if (criteria.id) {
        query = query.where('id', '=', criteria.id) // Kysely is immutable, you must re-assign!
    }

    if (criteria.name) {
        query = query.where('name', '=', criteria.name)
    }
    if (criteria.amount) {
        query = query.where('amount', '=', criteria.amount)
    }
    if (criteria.createdBy) {
        query = query.where('createdBy', '=', criteria.createdBy)
    }

    return await query.selectAll().execute()
}

export async function findBudgetByCreatedBy(criteria: Partial<Budgets>) {
    return await sql<Budgets>`SELECT b.*, (select ifnull(sum(amount),0) from expenses e where e.budgetsId = b.id) as totalSpend, (select count(id) from expenses e where e.budgetsId = b.id) as totalItem FROM budgets b where b."createdBy" = ${criteria.createdBy} order by b.id desc`.execute(db)
}

export async function updateBudget(id: number, updateWith: BudgetsUpdate) {
    await db.updateTable('budgets').set(updateWith).where('id', '=', id).execute()
}

export async function createBudget(budget: NewBudgets) {
    return await db.insertInto('budgets')
        .values(budget)
        .returningAll()
        .executeTakeFirstOrThrow()
}

export async function deleteBudget(id: number) {
    return await db.deleteFrom('budgets').where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
}

export async function clearAllBudget() {
    return await db.deleteFrom('budgets').execute()
}