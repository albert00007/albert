import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './content.entity';
import { CreateContentInput } from './dto/create-content.input';
import { UpdateContentInput } from './dto/update-content.input';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  async findAll(section?: string): Promise<Content[]> {
    if (section) {
      return this.contentRepository.find({
        where: { section },
        order: { order: 'ASC' },
      });
    }
    return this.contentRepository.find({ order: { order: 'ASC' } });
  }

  async findOne(id: number): Promise<Content> {
    const content = await this.contentRepository.findOne({ where: { id } });
    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    return content;
  }

  async create(createContentInput: CreateContentInput): Promise<Content> {
    const newContent = this.contentRepository.create(createContentInput);
    return this.contentRepository.save(newContent);
  }

  async update(id: number, updateContentInput: UpdateContentInput): Promise<Content> {
    const content = await this.findOne(id);
    Object.assign(content, updateContentInput);
    return this.contentRepository.save(content);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.contentRepository.delete(id);
    return !!(result.affected && result.affected > 0);
  }
}

