import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDTO } from './../models/create-event.dto';
import { Event } from './../models/event.entity';
import { Sport } from './../models/sport.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(Sport) private sportRepository: Repository<Sport>,
  ) {}

  async get(id: number) {
    return await this.eventRepository.findOne(id);
  }

  async getAll(options: IPaginationOptions): Promise<Pagination<Event>> {
    let events = this.eventRepository.createQueryBuilder('events');

    return paginate<Event>(events, options);
  }

  async create(createEventDTO: CreateEventDTO) {
    const event: Event = await this.eventRepository.create(createEventDTO);

    await this.eventRepository.save(event);
  }

  async createSport(name: string) {
    const sport = await this.sportRepository.create({ name });

    await this.sportRepository.save(sport);
  }
}
