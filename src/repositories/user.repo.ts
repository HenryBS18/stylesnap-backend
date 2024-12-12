import { User } from 'types'
import { db } from '../utils/db'

export class UserRepo {
  public async create(user: User): Promise<User> {
    const { firstName, lastName = '', email, password } = user

    return await db.user.create({
      data: {
        firstName, lastName, email, password
      }
    })
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await db.user.findFirst({
      where: {
        email
      }
    })
  }
}
