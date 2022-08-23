import { Module } from "@nestjs/common";
import { GroupsController } from "./groups.controller";
import { GroupsService } from "./groups.service";
import { MongooseModule } from "@nestjs/mongoose";
import { GroupSchema } from "./group.model";

@Module({
    // Defines model and makes it injectable
    imports: [MongooseModule.forFeature([{name: 'Group', schema: GroupSchema}])],
    controllers: [GroupsController],
    providers: [GroupsService],
})
export class GroupsModule {}