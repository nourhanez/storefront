import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const client: Pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT as string),
  database:
    process.env.ENVI === 'test' ? process.env.POSTGRES_TEST_DB : process.env.POSTGRES_DB
});



export default client