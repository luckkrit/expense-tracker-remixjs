import { db } from './'
import { ExpensesUpdate, Expenses, NewExpenses } from './types'


export async function findExpenseById(id: number) {
    return await db.selectFrom('expenses')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
}

export async function findExpense(criteria: Partial<Expenses>) {
    let query = db.selectFrom('expenses')

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


export async function updateExpense(id: number, updateWith: ExpensesUpdate) {
    await db.updateTable('expenses').set(updateWith).where('id', '=', id).execute()
}


export async function createExpense(expense: NewExpenses) {
    return await db.insertInto('expenses')
        .values(expense)
        .returningAll()
        .executeTakeFirstOrThrow()
}

export async function deleteExpense(id: number) {
    return await db.deleteFrom('expenses').where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
}

export async function clearAllExpense() {
    return await db.deleteFrom('expenses').execute()
}