import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import slugify from 'slugify';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(slug: string): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { slug } });
    if (!post) {
      throw new NotFoundException(`Post with slug "${slug}" not found`);
    }
    return post;
  }

  async create(createPostInput: any): Promise<Post> {
    const data: Partial<Post> = { ...createPostInput };
    if (!data.slug && data.title) {
      data.slug = slugify(data.title, { lower: true, strict: true });
    }
    const post = this.postRepository.create(data);
    return this.postRepository.save(post);
  }


  async update(id: number, updatePostInput: any): Promise<Post> {
    const post = await this.findOneById(id);
    Object.assign(post, updatePostInput);
    if (updatePostInput.title && !updatePostInput.slug) {
      post.slug = slugify(updatePostInput.title, { lower: true, strict: true });
    }
    return this.postRepository.save(post);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.postRepository.delete(id);
    return !!(result.affected && result.affected > 0);
  }

  private async findOneById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }
}
