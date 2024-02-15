import { Client } from "pg";

const client = new Client({
  connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres"
});

async function createUsersTable() {
  try {
    await client.connect();

    // await client.query('CREATE USER testuser3 WITH PASSWORD \'testpassword\';');

    // // Grant privileges on the public schema to the testuser
    // await client.query('GRANT ALL PRIVILEGES ON SCHEMA public TO testuser3;');
    // Now, create the users table
    const result = await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

createUsersTable();
