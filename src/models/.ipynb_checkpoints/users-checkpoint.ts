// @ts-ignore
import Client from '../database'
import bcrypt from 'bcrypt'

export type User = {
     id: number;
     firstName: string;
     lastName: string;
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
    const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *'
    // @ts-ignore
    const conn = await Client.connect()

    const hash = bcrypt.hashSync(b.password + pepper,  parseInt(saltRounds))
    
    const result = await conn
        .query(sql, [b.firstName, b.lastName, hash])

    
    const user = result.rows[0]

    conn.release()

    return user
      } catch (err) {
          throw new Error(`Could not add new user ${b.firstName}. Error: ${err}`)
      }
  }
    
    
  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await Client.connect()
    const sql = 'SELECT password FROM users WHERE username=($1)'

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
}