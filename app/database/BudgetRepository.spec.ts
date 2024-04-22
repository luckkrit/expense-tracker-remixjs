import { sql } from 'kysely'
import { db } from './'
import * as BudgetRepository from './BudgetRepository'
import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest'

describe('BudgetRepository', () => {
    beforeAll(async () => {
        await db.schema.createTable('budgets')
            .addColumn('id', 'integer', (cb) => cb.primaryKey().autoIncrement().notNull())
            .addColumn('name', 'text', (cb) => cb.notNull())
            .addColumn('amount', 'text', (cb) => cb.notNull())
            .addColumn('icon', 'text', (cb) => cb.notNull())
            .addColumn('createdBy', 'text', (cb) => cb.notNull())
            .addColumn('created_at', 'timestamp', (cb) =>
                cb.notNull().defaultTo(sql`current_timestamp`)
            )
            .execute()
    })
    afterAll(async () => {
        await BudgetRepository.clearAllBudget()
    })
    test('create', async () => {
        const budget = await BudgetRepository.createBudget({ name: "Test", amount: "1000", icon: "N/A", createdBy: "luckkrit@gmail.com" })
        expect(budget.amount).toBe("1000")
    })
    test('delete', async () => {
        await BudgetRepository.clearAllBudget()
        expect((await BudgetRepository.findBudget({})).length).toBe(0)
    })
})