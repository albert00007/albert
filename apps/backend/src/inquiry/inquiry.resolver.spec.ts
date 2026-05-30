import { Test, TestingModule } from '@nestjs/testing';
import { InquiryResolver } from './inquiry.resolver';
import { InquiryService } from './inquiry.service';
import { Inquiry, CreateInquiryInput } from './inquiry.entity';

describe('InquiryResolver', () => {
  let resolver: InquiryResolver;
  let service: InquiryService;

  const mockInquiry: Inquiry = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    message: 'Hello, I have a question.',
    createdAt: new Date(),
  };

  const mockCreateInquiryInput: CreateInquiryInput = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    message: 'Hello, I have a question.',
  };

  const mockInquiryService = {
    create: jest.fn().mockResolvedValue(mockInquiry),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InquiryResolver,
        {
          provide: InquiryService,
          useValue: mockInquiryService,
        },
      ],
    }).compile();

    resolver = module.get<InquiryResolver>(InquiryResolver);
    service = module.get<InquiryService>(InquiryService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createInquiry', () => {
    it('should create a new inquiry', async () => {
      expect(await resolver.createInquiry(mockCreateInquiryInput)).toEqual(mockInquiry);
      expect(service.create).toHaveBeenCalledWith(mockCreateInquiryInput);
    });
  });
});
