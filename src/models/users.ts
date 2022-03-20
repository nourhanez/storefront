// @ts-ignore
import Client from '../database'

const bcrypt = require('bcrypt')

const dotenv = require('dotenv')

dotenv.config()
export type User = {
     id: number;
     firstName: string;
     lastName: string;
     username: string;
     password: string;
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
    const sql = 'SELECT * FROM users WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async create(b: User): Promise<User> {
      try {
      const pepper: string = process.env.BCRYPT_PASSWORD as string;
      const saltRounds: string = process.env.SALT_ROUNDS as string;
    const sql = 'INSERT INTO users (firstname, lastname, password, username) VALUES($1, $2, $3, $4) RETURNING *'
    // @ts-ignore
    const conn = await Client.connect()

    const hash = bcrypt.hashSync(b.password + pepper,  parseInt(saltRounds))
    
    const result = await conn
        .query(sql, [b.firstName, b.lastName, hash, b.username])

    
    const user = result.rows[0]

    conn.release()

    return user
      } catch (err) {
          throw new Error(`Could not add new user ${b.firstName}. Error: ${err}`)
      }
  }
    
    
  async authenticate(username: string, password: string): Promise<User | null> {
      const pepper: string = process.env.BCRYPT_PASSWORD as string;
    const conn = await Client.connect()
    const sql = 'SELECT * FROM users WHERE username=($1)'

    const result = await conn.query(sql, [username])

    console.log(password+pepper)

    if(result.rows.length) {

      const user = result.rows[0]

      console.log(user)

      if (bcrypt.compareSync(password+pepper, user.password)) {
        return user
      }
    }

    return null
  }

  async delete(id: number): Promise<User> {
      try {
    const sql = 'DELETE FROM users WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    const user = result.rows[0]

    conn.release()

    return user
      } catch (err) {
          throw new Error(`Could not delete user ${id}. Error: ${err}`)
      }
  }
}