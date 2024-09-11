import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly userRepository: UserRepository,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<any> {
    if (registerUserDto.password === registerUserDto.re_password) {
      try {
        const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

        const userDto = {
          name: registerUserDto.name,
          last_name: registerUserDto.last_name,
          email: registerUserDto.email,
          password: hashedPassword,
        };
        const user = await this.userRepository.createUser(userDto);

        const payload = { id: user.id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '1h',
        });

        return { user, token };
      } catch {
        throw new Error('An error occurred while creating the user');
      }
    }
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userRepository.findByEmail(loginUserDto.email);

    if (!user) {
      throw new Error('User does not exist');
    }

    if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
      const payload = { id: user.id, email: user.email };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return { user, token };
    }
    else {
      throw new Error('Wrong data! Try again');
    }
  }

  async findUser(
    email: string,
    password: string,
    rePassword: string,
  ): Promise<User | null> {
    if (password !== rePassword) {
      throw new Error('Passwords do not match');
    }
    const user = await this.userModel.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error('User does not exist');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return user;
    }
  }

  async findUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
