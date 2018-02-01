import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Room } from './interfaces/room.interface';
import { RoomSchema } from './schemas/room.schema';
import { Message } from './interfaces/message.interface';

@Component()
export class RoomsService {
  constructor(
    @InjectModel(RoomSchema) private readonly roomModel: Model<Room>,
  ) {}

  async create(room: Room): Promise<Room> {
    const createdRoom = new this.roomModel(room);
    return await createdRoom.save();
  }

  async addMessage(message: Message, id: string) {
    const room = await this.findById(id);
    room.messages.push(message);
    return await room.save();
  }

  async findMessages(id: string, limit: number) {
    const room = await this.findById(id); // TODO: use findOne()
    return room.messages;
  }

  async findAll(options?: any): Promise<Room[]> {
    return await this.roomModel.find(options).exec();
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
