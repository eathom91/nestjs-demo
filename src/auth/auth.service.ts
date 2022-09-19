import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  // constructor(private usersService: UsersService){}

  // async validateUser(userId: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findUser(userId);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }
}
