import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Inquiry, CreateInquiryInput } from './inquiry.entity';
import { InquiryService } from './inquiry.service';

@Resolver(() => Inquiry)
export class InquiryResolver {
  constructor(private readonly inquiryService: InquiryService) {}

  @Mutation(() => Inquiry, { name: 'createInquiry' })
  async createInquiry(
    @Args('data', { type: () => CreateInquiryInput }) data: CreateInquiryInput,
  ): Promise<Inquiry> {
    return this.inquiryService.create(data);
  }
}
