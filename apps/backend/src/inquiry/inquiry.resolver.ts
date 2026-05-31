import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Inquiry, CreateInquiryInput } from './inquiry.entity';
import { InquiryService } from './inquiry.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => Inquiry)
export class InquiryResolver {
  constructor(private readonly inquiryService: InquiryService) {}

  // This query is now explicitly defined and protected
  @UseGuards(JwtAuthGuard)
  @Query(() => [Inquiry], { name: 'inquiries' })
  findAll() {
    return this.inquiryService.findAll();
  }

  @Mutation(() => Inquiry, { name: 'createInquiry' })
  async createInquiry(
    @Args('data', { type: () => CreateInquiryInput }) data: CreateInquiryInput,
  ): Promise<Inquiry> {
    return this.inquiryService.create(data);
  }
}
