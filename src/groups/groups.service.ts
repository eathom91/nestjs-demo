import { Injectable, NotFoundException } from '@nestjs/common';
import { Group } from './group.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GroupsService {
  // Ensures this list can't be modified without going through a service method.
  private groups: Group[] = [];

  constructor(
    @InjectModel('Group') private readonly groupModel: Model<Group>,
  ) {}
  async insertGroup(
    campus: string,
    demographic: string,
    group_type: string,
    meeting_date: string,
    zip_code: number,
  ) {
    const newGroup = new this.groupModel({
      campus: campus,
      demographic: demographic,
      group_type: group_type,
      meeting_date: meeting_date,
      zip_code: zip_code,
    });
    const result = await newGroup.save();
    console.log(result);
    return result.id as string;
  }

  async getGroups() {
    const groups = await this.groupModel.find().exec();
    return groups.map((group) => ({
      id: group.id,
      campus: group.campus,
      demographic: group.demographic,
      group_type: group.group_type,
      meeting_date: group.meeting_date,
      zip_code: group.zip_code,
    }));
  }

  async getOneGroup(groupId: string) {
    const group = await this.findGroup(groupId);
    return {
      id: group.id,
      campus: group.campus,
      demographic: group.demographic,
      group_type: group.group_type,
      meeting_date: group.meeting_date,
      zip_code: group.zip_code,
    };
  }

  async updateGroup(
    groupId: string,
    campus: string,
    demographic: string,
    group_type: string,
    meeting_date: string,
    zip_code: number,
  ) {
    const updatedGroup = await this.findGroup(groupId);
    if (campus) {
      updatedGroup.campus = campus;
    }
    if (demographic) {
      updatedGroup.demographic = demographic;
    }
    if (group_type) {
      updatedGroup.group_type = group_type;
    }
    if (meeting_date) {
      updatedGroup.meeting_date = meeting_date;
    }
    if (zip_code) {
      updatedGroup.zip_code = zip_code;
    }
    updatedGroup.save();
  }

  async deleteGroup(groupId: string) {
    const result = await this.groupModel.deleteOne({ _id: groupId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find group.');
    }
  }

  private async findGroup(id: string): Promise<Group> {
    let group: Group;
    try {
      group = await this.groupModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find group.');
    }
    if (!group) {
      throw new NotFoundException('Could not find group.');
    }
    return group;
  }
}
