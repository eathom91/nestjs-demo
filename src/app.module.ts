import { Module } from '@nestjs/common';
import { MongooseModule} from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupsModule } from './groups/groups.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GroupsModule, UsersModule,
    MongooseModule.forRoot('mongodb+srv://eathom91:hXNUZKxtww03Tva9@cluster0.zoujn.mongodb.net/nestjs-demo?retryWrites=true&w=majority'),
    AuthModule,
            ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
