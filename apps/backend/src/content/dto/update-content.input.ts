import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateContentInput } from './create-content.input';

@InputType()
export class UpdateContentInput extends PartialType(CreateContentInput) {
  @Field(() => Int)
  id: number;
}
