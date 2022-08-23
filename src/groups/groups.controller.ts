import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group } from './group.model';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  async addGroup(
    @Body('campus') groupCampus: string,
    @Body('demographic') groupDemo: string,
    @Body('group_type') groupType: string,
    @Body('meeting_date') groupMeet: string,
    @Body('zip_code') groupZip: number,
  ) {
    const generatedId = await this.groupsService.insertGroup(
      groupCampus,
      groupDemo,
      groupType,
      groupMeet,
      groupZip
    );
    return { id: generatedId };
  }

  @Get()
  async getAllGroups() {
    const groups = await this.groupsService.getGroups();
    return groups;
  }

  @Get(':id')
  getGroup(@Param('id') groupId: string) {
    return this.groupsService.getOneGroup(groupId);
  }

  @Patch(':id')
  async updateGroup(
    @Param('id') groupId: string,
    @Body('campus') groupCampus: string,
    @Body('demographic') groupDemo: string,
    @Body('group_type') groupType: string,
    @Body('meeting_date') groupMeet: string,
    @Body('zip_code') groupZip: number,
  ) {
    await this.groupsService.updateGroup(
      groupId,
      groupCampus,
      groupDemo,
      groupType,
      groupMeet,
      groupZip);
    return null;
  }

  @Delete(':id')
  async removeGroup(@Param('id') groupId: string, ) {
    await this.groupsService.deleteGroup(groupId);
    return null;
  }
}
