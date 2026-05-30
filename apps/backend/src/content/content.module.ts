import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './content.entity';
import { ContentService } from './content.service';
import { ContentResolver } from './content.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Content])],
  providers: [ContentResolver, ContentService],
})
export class ContentModule {}
