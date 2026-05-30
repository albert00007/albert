import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Post } from './post.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => Post)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return this.blogService.findAll();
  }

  @Query(() => Post)
  async post(@Args('slug') slug: string): Promise<Post> {
    return this.blogService.findOne(slug);
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Args('title') title: string,
    @Args('content') content: string,
    @Args('excerpt', { nullable: true }) excerpt?: string,
    @Args('slug', { nullable: true }) slug?: string,
  ): Promise<Post> {
    return this.blogService.create({ title, content, excerpt, slug });
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('title', { nullable: true }) title?: string,
    @Args('content', { nullable: true }) content?: string,
    @Args('excerpt', { nullable: true }) excerpt?: string,
    @Args('slug', { nullable: true }) slug?: string,
  ): Promise<Post> {
    return this.blogService.update(id, { title, content, excerpt, slug });
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deletePost(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.blogService.remove(id);
  }
}
