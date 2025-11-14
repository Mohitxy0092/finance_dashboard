import 'dotenv/config';
import { config } from 'dotenv';
config({ path: '.env.local' });

import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../db/schema';

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const db = drizzle(pool, { schema });

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data (for dev only)
  await db.delete(schema.transactions);
  await db.delete(schema.categories);
  await db.delete(schema.accounts);

  // Insert accounts
  await db.insert(schema.accounts).values([
    { id: 'acc_1', name: 'Checking Account', userId: 'user_1' },
    { id: 'acc_2', name: 'Savings Account', userId: 'user_1' },
  ]);

  // Insert categories
  await db.insert(schema.categories).values([
    { id: 'cat_1', name: 'Groceries', userId: 'user_1' },
    { id: 'cat_2', name: 'Salary', userId: 'user_1' },
  ]);

  // Insert transactions
  await db.insert(schema.transactions).values([
    {
      id: 'txn_1',
      amount: -12000,
      payee: 'Supermarket',
      notes: 'Weekly groceries',
      date: new Date(),
      accountId: 'acc_1',
      categoryId: 'cat_1',
    },
    {
      id: 'txn_2',
      amount: 250000,
      payee: 'Company',
      notes: 'Monthly salary',
      date: new Date(),
      accountId: 'acc_1',
      categoryId: 'cat_2',
    },
  ]);

  console.log('Seed data inserted successfully!');
}

main()
  .catch((err) => {
    console.error(' Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
    console.log(' Pool closed');
  });
