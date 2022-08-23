import { Module } from '@nestjs/common';
import { MongooseModule} from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [GroupsModule, MongooseModule.forRoot('mongodb+srv://eathom91:hXNUZKxtww03Tva9@cluster0.zoujn.mongodb.net/nestjs-demo?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
