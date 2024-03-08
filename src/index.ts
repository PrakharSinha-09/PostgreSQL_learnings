import { Client } from "pg";
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL
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

    

  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

async function insertData(){
    try {
        await client.connect();
        const insertQuery = "INSERT INTO users (username, email, password) VALUES ('username2', 'user3@example.com', 'user_password');";
        const res = await client.query(insertQuery);
        console.log('Insertion success:', res); // Output insertion result

        //more secure way to insert data!

    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
}

//more secure way to insert data!
async function insertData2(username: string, email: string, password: string){
    try {
        await client.connect();
        const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
        const values = [username, email, password];
        const res = await client.query(insertQuery, values);

        console.log('Insertion success:', res); // Output insertion result

    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
}

//getting user by sending email as an input
async function getUser(email:String) {
    try {
        await client.connect(); // Ensure client connection is established
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = await client.query(query, values);
        
        if (result.rows.length > 0) {
          console.log('User found:', result.rows[0]); // Output user data
          return result.rows[0]; // Return the user data
        } else {
          console.log('No user found with the given email.');
          return null; // Return null if no user was found
        }
      } catch (err) {
        console.error('Error during fetching user:', err);
        throw err; // Rethrow or handle error appropriately
      } finally {
        await client.end(); // Close the client connection
      }
}

//address
async function createUsersAddressTable() {
  try {
    await client.connect();

    // await client.query('CREATE USER testuser3 WITH PASSWORD \'testpassword\';');

    // // Grant privileges on the public schema to the testuser
    // await client.query('GRANT ALL PRIVILEGES ON SCHEMA public TO testuser3;');
    // Now, create the users table
    const result = await client.query(`
      CREATE TABLE addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        street VARCHAR(255) NOT NULL,
        pincode VARCHAR(20),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    

  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

async function insertData3(user_id: number, city:string, country:string, street: string, pincode:string){
  try {
      await client.connect();
      const insertQuery = "INSERT INTO users (user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5)";
      const values = [user_id, city, country, street, pincode];
      const res = await client.query(insertQuery, values);

      console.log('Insertion success:', res); // Output insertion result

  } catch (error) {
      console.error(error);
  } finally {
      await client.end();
  }
}
// createUsersTable();
// insertData2('user1010', 'user110@example.com', 'user_password').catch(console.error);
// getUser('user10@example.com').catch(console.error);

// createUsersAddressTable()
insertData3(2, 'New York', 'USA', '123 Broadway St', '10001')