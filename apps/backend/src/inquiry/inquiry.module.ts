import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { InquiryService } from './inquiry.service';
import { InquiryResolver } from './inquiry.resolver';
import { Inquiry } from './inquiry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inquiry]),
    ConfigModule,
  ],
  providers: [InquiryService, InquiryResolver],
})
export class InquiryModule {}
