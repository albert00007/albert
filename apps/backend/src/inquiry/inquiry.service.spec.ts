import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InquiryService } from './inquiry.service';
import { ConfigService } from '@nestjs/config';
import { Inquiry, CreateInquiryInput } from './inquiry.entity';

describe('InquiryService', () => {
  let service: InquiryService;
  let repository: Repository<Inquiry>;

  const mockInquiry: Inquiry = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+374 41 355 605',
    message: 'I would like to discuss a project.',
    createdAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      switch (key) {
        case 'TELEGRAM_BOT_TOKEN':
          return 'mockTelegramToken';
        case 'TELEGRAM_CHAT_ID':
          return 'mockTelegramChatId';
        case 'EMAIL_FORWARD_URL':
          return 'mockEmailForwardUrl';
        default:
          return undefined;
      }
    }),
  };

  beforeEach(async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    }) as jest.Mock;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InquiryService,
        {
          provide: getRepositoryToken(Inquiry),
          useValue: mockRepository,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<InquiryService>(InquiryService);
    repository = module.get<Repository<Inquiry>>(getRepositoryToken(Inquiry));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new inquiry with all fields', async () => {
      const input: CreateInquiryInput = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+374 41 355 605',
        message: 'I would like to discuss a project.',
      };

      mockRepository.create.mockReturnValue(mockInquiry);
      mockRepository.save.mockResolvedValue(mockInquiry);

      const result = await service.create(input);
      expect(result).toEqual(mockInquiry);
      expect(mockRepository.create).toHaveBeenCalledWith(input);
      expect(mockRepository.save).toHaveBeenCalledWith(mockInquiry);
    });

    it('should create inquiry without optional phone field', async () => {
      const input: CreateInquiryInput = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        message: 'Hello!',
      };

      const inquiryWithoutPhone: Inquiry = {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: undefined,
        message: 'Hello!',
        createdAt: new Date(),
      };

      mockRepository.create.mockReturnValue(inquiryWithoutPhone);
      mockRepository.save.mockResolvedValue(inquiryWithoutPhone);

      const result = await service.create(input);
      expect(result.name).toBe('Jane Doe');
      expect(result.email).toBe('jane@example.com');
      expect(result.phone).toBeUndefined();
      expect(result.message).toBe('Hello!');
    });

    it('should handle empty message', async () => {
      const input: CreateInquiryInput = {
        name: 'John Doe',
        email: 'john@example.com',
        message: '',
      };

      const emptyMessageInquiry: Inquiry = {
        id: 3,
        name: 'John Doe',
        email: 'john@example.com',
        phone: undefined,
        message: '',
        createdAt: new Date(),
      };

      mockRepository.create.mockReturnValue(emptyMessageInquiry);
      mockRepository.save.mockResolvedValue(emptyMessageInquiry);

      const result = await service.create(input);
      expect(result.message).toBe('');
    });
  });
});
