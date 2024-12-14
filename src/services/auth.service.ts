import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserRepo } from '../repositories';
import { User } from "../types";

const userRepo: UserRepo = new UserRepo()
const secret: string = process.env.JWT_SECRET!
const expiresIn: number = 60 * 60 * 24 * 30

interface RegisterData {
  firstName: string
  lastName?: string
  email: string
  password: string
}

interface LoginData {
  email: string
  password: string
}

export class AuthService {
  public async register(data: RegisterData): Promise<string> {
    const { firstName, lastName = '', email, password } = data

    const existedUser: User | null = await userRepo.findByEmail(email)

    if (existedUser != null) {
      throw new Error('Email is already used')
    }

    const hashedPassword: string = await bcrypt.hash(password, 10)

    const user: User = await userRepo.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })

    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }

    const token: string = jwt.sign(payload, secret, {
      algorithm: 'HS256',
      expiresIn: expiresIn
    })

    return token
  }

  public async login(data: LoginData): Promise<string> {
    const { email, password } = data

    const user: User | null = await userRepo.findByEmail(email)

    if (user == null) {
      throw new Error('Email not found')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new Error('Wrong password')
    }

    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }

    const token: string = jwt.sign(payload, secret, {
      algorithm: 'HS256',
      expiresIn: expiresIn
    })

    return token
  }
}