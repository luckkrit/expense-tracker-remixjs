import { sql } from 'kysely'
import { db } from '.'
import * as ExpenseRepository from './ExpenseRepository'
import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest'

describe('ExpenseRepository', () => {
    beforeAll(async () => {
        await db.schema.createTable('expenses')
            .addColumn('id', 'integer', (cb) => cb.primaryKey().autoIncrement().notNull())
            .addColumn('name', 'text', (cb) => cb.notNull())
            .addColumn('amount', 'text', (cb) => cb.notNull())
            .addColumn('budgetsId', 'integer', (cb) => cb.notNull())
            .addColumn('createdBy', 'text', (cb) => cb.notNull())
            .addColumn('created_at', 'timestamp', (cb) =>
                cb.notNull().defaultTo(sql`current_timestamp`)
            )
            .execute()
    })
    afterAll(async () => {
        await ExpenseRepository.clearAllExpense()
    })
    test('create', async () => {
        const expense = await ExpenseRepository.createExpense({ name: "Test", amount: "1000", budgetsId: 1, createdBy: "luckkrit@gmail.com" })
        expect(expense.amount).toBe("1000")
    })
    test('delete', async () => {
        await ExpenseRepository.clearAllExpense()
        expect((await ExpenseRepository.findExpense({})).length).toBe(0)
    })
})