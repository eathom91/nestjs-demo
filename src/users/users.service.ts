import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  // Ensures this list can't be modified without going through a service method.
  private users: User[] = [];

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}
  async insertUser(
    email: string,
    password: string,
    phone: string,
    role: string,
  ) {
    const newUser = new this.userModel({
      email: email,
      password: password,
      phone: phone,
      role: role,
    });
    const result = await newUser.save();
    console.log(result);
    return result.id as string;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      password: user.password,
      phone: user.phone,
      role: user.role
    }));
  }

  async getOneUser(userId: string) {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      phone: user.phone,
      role: user.role,
    };
  }

  async updateUser(
    userId: string,
    email: string,
    password: string,
    phone: string,
    role: string,
  ) {
    const updatedUser = await this.findUser(userId);
    if (email) {
      updatedUser.email = email;
    }
    if (password) {
      updatedUser.password = password;
    }
    if (phone) {
      updatedUser.phone = phone;
    }
    if (role) {
      updatedUser.role = role;
    }
    updatedUser.save();
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find user.');
    }
  }

  public async findUser(id: string): Promise<User> {
    let user: User;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}
