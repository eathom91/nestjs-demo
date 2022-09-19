import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
    @Body('phone') userPhone: string,
    @Body('role') userRole: string,
  ) {
    const generatedId = await this.usersService.insertUser(
      userEmail,
      userPassword,
      userPhone,
      userRole,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this.usersService.getOneUser(userId);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
    @Body('phone') userPhone: string,
    @Body('role') userRole: string,
  ) {
    await this.usersService.updateUser(
      userId,
      userEmail,
      userPassword,
      userPhone,
      userRole,
      );
    return null;
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string, ) {
    await this.usersService.deleteUser(userId);
    return null;
  }
}