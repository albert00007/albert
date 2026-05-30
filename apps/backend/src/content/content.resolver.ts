import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Content } from './content.entity';
import { ContentService } from './content.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateContentInput } from './dto/create-content.input';
import { UpdateContentInput } from './dto/update-content.input';

@Resolver(() => Content)
export class ContentResolver {
  constructor(private readonly contentService: ContentService) {}

  @Query(() => [Content], { name: 'contents' })
  async getContents(
    @Args('section', { type: () => String, nullable: true }) section?: string,
  ): Promise<Content[]> {
    return this.contentService.findAll(section);
  }

  @Query(() => Content, { name: 'content' })
  async getContent(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Content> {
    return this.contentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Content)
  async createContent(
    @Args('createContentInput') createContentInput: CreateContentInput,
  ): Promise<Content> {
    return this.contentService.create(createContentInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Content)
  async updateContent(
    @Args('updateContentInput') updateContentInput: UpdateContentInput,
  ): Promise<Content> {
    return this.contentService.update(updateContentInput.id, updateContentInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteContent(@Args('id', { type: () => Int }) id: number) {
    return this.contentService.remove(id);
  }
}
