import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry, CreateInquiryInput } from './inquiry.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InquiryService {
  private readonly logger = new Logger(InquiryService.name);

  constructor(
    @InjectRepository(Inquiry)
    private readonly inquiryRepository: Repository<Inquiry>,
    private readonly configService: ConfigService,
  ) {}

  async create(data: CreateInquiryInput): Promise<Inquiry> {
    const inquiry = this.inquiryRepository.create(data);
    const savedInquiry = await this.inquiryRepository.save(inquiry);
    
    // Fire and forget notifications
    this.sendNotifications(savedInquiry).catch(err => 
      this.logger.error(`Failed to send notifications: ${err.message}`)
    );
    
    return savedInquiry;
  }

  async findAll(): Promise<Inquiry[]> {
    return this.inquiryRepository.find({
      order: { createdAt: 'DESC' }, // Return newest first
    });
  }

  private async sendNotifications(inquiry: Inquiry) {
    const telegramToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    const telegramChatId = this.configService.get<string>('TELEGRAM_CHAT_ID');
    const emailEndpoint = this.configService.get<string>('EMAIL_FORWARD_URL'); // e.g. Mail.ru webhook
    
    const message = `
New Inquiry from MSD Website!
------------------------
Name: ${inquiry.name}
Email: ${inquiry.email}
Phone: ${inquiry.phone || 'Not provided'}
Message: ${inquiry.message}
Date: ${inquiry.createdAt.toLocaleString()}
    `;

    // Send to Telegram if configured
    if (telegramToken && telegramChatId) {
      try {
        const tgUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
        await fetch(tgUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: message,
          }),
        });
        this.logger.log('Telegram notification sent');
      } catch (err) {
        this.logger.error('Telegram API error', err);
      }
    }

    // Send to Email (Mail.ru via webhook/api) if configured
    if (emailEndpoint) {
      try {
        await fetch(emailEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject: `New MSD Lead: ${inquiry.name}`,
            text: message,
            replyTo: inquiry.email
          }),
        });
        this.logger.log('Email notification forwarded');
      } catch (err) {
        this.logger.error('Email API error', err);
      }
    }
  }
}
