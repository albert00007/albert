import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateContentInput {
  @Field()
  title: string;

  @Field()
  section: string;

  @Field()
  content: string;
}
