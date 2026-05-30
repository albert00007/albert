import { Test, TestingModule } from '@nestjs/testing';
import { ContentResolver } from './content.resolver';
import { ContentService } from './content.service';
import { Content } from './content.entity';

describe('ContentResolver', () => {
  let resolver: ContentResolver;
  let service: ContentService;

  const mockContent: Content = {
    id: 1,
    title: 'Test Content',
    section: 'home',
    description: 'This is a test content body',
    icon: undefined,
    order: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockContentService = {
    findAll: jest.fn().mockResolvedValue([mockContent]),
    findOne: jest.fn().mockResolvedValue(mockContent),
    create: jest.fn().mockResolvedValue(mockContent),
    update: jest.fn().mockResolvedValue(mockContent),
    remove: jest.fn().mockResolvedValue(mockContent),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentResolver,
        {
          provide: ContentService,
          useValue: mockContentService,
        },
      ],
    }).compile();

    resolver = module.get<ContentResolver>(ContentResolver);
    service = module.get<ContentService>(ContentService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getContents', () => {
    it('should return an array of contents', async () => {
      expect(await resolver.getContents()).toEqual([mockContent]);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return contents filtered by section', async () => {
      expect(await resolver.getContents('home')).toEqual([mockContent]);
      expect(service.findAll).toHaveBeenCalledWith('home');
    });
  });

  describe('getContent', () => {
    it('should return a single content item', async () => {
      expect(await resolver.getContent(1)).toEqual(mockContent);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  // Note: The ContentResolver currently only exposes getContents and getContent.
  // If createContent, updateContent, deleteContent were exposed, tests would be added here.
  // Based on the provided content.resolver.ts, these mutations are not present.
});
