// @ts-ignore
import Client from '../database'

export type Order = {
     id: number;
     status: string;
     user_id: number;
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Order> {
    try {
    const sql = 'SELECT * FROM orders WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }

  async showByUser(user_id: number): Promise<Order> {
    try {
    const sql = 'SELECT * FROM orders WHERE user_id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [user_id])

    conn.release()

    return result.rows
    } catch (err) {
        throw new Error(`Could not find orders for user ${user_id}. Error: ${err}`)
    }
  }
    
  async create(b: Order): Promise<Order> {
      try {
    const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn
        .query(sql, [b.status, b.user_id])

    const order = result.rows[0]

    conn.release()

    return order
      } catch (err) {
          throw new Error(`Could not add new order ${b.user_id}. Error: ${err}`)
      }
  }

  async delete(id: string): Promise<Order> {
      try {
    const sql = 'DELETE FROM orders WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    const order = result.rows[0]

    conn.release()

    return order
      } catch (err) {
          throw new Error(`Could not delete order ${id}. Error: ${err}`)
      }
  }
}