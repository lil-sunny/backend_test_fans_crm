import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async createUser(userData: Partial<User>): Promise<User> {
    return this.userModel.create(userData);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async updateUser(id: number, updateData: Partial<User>): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (user) {
      return user.update(updateData);
    }
    throw new Error('User not found');
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userModel.findByPk(id);
    if (user) {
      await user.destroy();
    } else {
      throw new Error('User not found');
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
}