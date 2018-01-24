import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Request,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';

import { RoomsService } from './rooms.service';
import { Room } from './interfaces/room.interface';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async index(): Promise<Room[]> {
    return await this.roomsService.findAll();
  }

  @Get(':id')
  async show(@Request() req): Promise<Room> {
    const id = req.params.id;
    if (!id)
      throw new HttpException(
        'ID parameter is missing',
        HttpStatus.BAD_REQUEST,
      );

    const room = await this.roomsService.findById(id);
    if (!room)
      throw new HttpException(
        `The room with the id: ${id} does not exists`,
        HttpStatus.BAD_REQUEST,
      );

    return room;
  }

  @Post()
  async create(@Body() body: Room): Promise<Room> {
    if (!body || (body && Object.keys(body).length === 0))
      throw new HttpException('Missing informations', HttpStatus.BAD_REQUEST);

    const room = await this.roomsService.create(body);

    return room;
  }

  @Put(':id')
  async update(@Request() req) {
    const id = req.params.id;
    if (!id)
      throw new HttpException(
        'ID parameter is missing',
        HttpStatus.BAD_REQUEST,
      );

    await this.roomsService.update(id, req.body);
  }

  @Delete(':id')
  public async delete(@Request() req) {
    const id = req.params.id;
    if (!id)
      throw new HttpException(
        'ID parameter is missing',
        HttpStatus.BAD_REQUEST,
      );

    await this.roomsService.delete(id);
  }
}
