import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { Post } from './post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [BlogService, BlogResolver],
  exports: [BlogService],
})
export class BlogModule {}
