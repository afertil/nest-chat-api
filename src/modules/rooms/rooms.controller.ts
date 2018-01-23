import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Request,
  HttpException,
  HttpStatus,
  Put
} from '@nestjs/common';

import { RoomsService } from './rooms.service';
import { Room } from './interfaces/room.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly RoomsService: RoomsService) {}

  @Get()
  async index(): Promise<Room[]> {
    return await this.RoomsService.findAll();
  }

  @Get(':id')
  async show(@Request() req): Promise<Room> {
    const id = req.params.id;
    if (!id)
      throw new HttpException(
        'ID parameter is missing',
        HttpStatus.BAD_REQUEST
      );

    const user = await this.RoomsService.findById(id);
    if (!user)
      throw new HttpException(
        `The user with the id: ${id} does not exists`,
        HttpStatus.BAD_REQUEST
      );

    return user;
  }

  @Post()
  async create(@Body() body) {
    if (!body || (body && Object.keys(body).length === 0))
      throw new HttpException('Missing informations', HttpStatus.BAD_REQUEST);

    await this.RoomsService.create(body);
  }

  @Put(':id')
  async update(@Request() req) {
    const id = req.params.id;
    if (!id)
      throw new HttpException(
        'ID parameter is missing',
        HttpStatus.BAD_REQUEST
      );

    await this.RoomsService.update(id, req.body);
  }

  @Delete(':id')
  public async delete(@Request() req) {
    const id = req.params.id;
    if (!id)
      throw new HttpException(
        'ID parameter is missing',
        HttpStatus.BAD_REQUEST
      );

    await this.RoomsService.delete(id);
  }
}
