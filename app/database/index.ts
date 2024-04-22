import { Database } from './types' // this is the Database interface we defined earlier
import SQLite from 'better-sqlite3'
import { Kysely, SqliteDialect } from 'kysely'

const dialect = new SqliteDialect({
    database: new SQLite('./data.sqlite3'),
})

export const db = new Kysely<Database>({
    dialect,
})