import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Room } from './interfaces/room.interface';
import { RoomSchema } from './schemas/room.schema';
import { Message } from './interfaces/message.interface';

@Component()
export class RoomsService {
  constructor(
    @InjectModel(RoomSchema) private readonly roomModel: Model<Room>
  ) {}

  async create(room: Room): Promise<Room> {
    const createdRoom = new this.roomModel(room);
    return await createdRoom.save();
  }

  async addMessage(message: Message, id: string) {
    const room = await this.findById(id);
    message.user = message.user._id;
    room.messages.push(message);

    return await room.save();
  }

  async findMessages(id: string, limit: number) {
    let room = await this.findWithLimit(id, limit);

    // Create the user room, if isn't already exist
    if (!room) {
      const userRoom = new this.roomModel({ _id: id, name: id, is_user: true });
      room = await this.create(userRoom);
    }
    console.log(room);
    return room.messages;
  }

  async findAll(options?: any): Promise<Room[]> {
    return await this.roomModel.find(options).exec();
  }

  async findWithLimit(id: string, limit: number): Promise<Room | null> {
    return await this.roomModel
      .findById(id)
      .slice('messages', limit)
      .populate('messages.user', { _id: 1, username: 1, email: 1 })
      .exec();
  }

  async findById(id: string): Promise<Room | null> {
    return await this.roomModel.findById(id).exec();
  }

  async findOne(options?: any, fields?: any): Promise<Room | null> {
    return await this.roomModel.findOne(options, fields).exec();
  }

  async update(id: number, newValue: Room): Promise<Room | null> {
    return await this.roomModel.findByIdAndUpdate(id, newValue).exec();
  }

  async delete(id: number): Promise<Room | null> {
    return await this.roomModel.findByIdAndRemove(id).exec();
  }
}
