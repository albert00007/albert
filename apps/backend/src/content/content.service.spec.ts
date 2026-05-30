import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ContentService } from './content.service';
import { Content } from './content.entity';

describe('ContentService', () => {
  let service: ContentService;
  let repository: Repository<Content>;

  const mockContent: Content = {
    id: 1,
    title: 'Test Title',
    description: 'Test description',
    section: 'about',
    icon: undefined,
    order: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentService,
        {
          provide: getRepositoryToken(Content),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ContentService>(ContentService);
    repository = module.get<Repository<Content>>(getRepositoryToken(Content));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all contents ordered by order ASC', async () => {
      mockRepository.find.mockResolvedValue([mockContent]);
      const result = await service.findAll();
      expect(result).toEqual([mockContent]);
      expect(mockRepository.find).toHaveBeenCalledWith({ order: { order: 'ASC' } });
    });

    it('should return contents filtered by section', async () => {
      mockRepository.find.mockResolvedValue([mockContent]);
      const result = await service.findAll('about');
      expect(result).toEqual([mockContent]);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { section: 'about' },
        order: { order: 'ASC' },
      });
    });

    it('should return empty array when no contents exist', async () => {
      mockRepository.find.mockResolvedValue([]);
      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a content item by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockContent);
      const result = await service.findOne(1);
      expect(result).toEqual(mockContent);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException when content not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'Content with ID 999 not found',
      );
    });
  });

  describe('create', () => {
    it('should create and return new content', async () => {
      const createInput = {
        title: 'New Content',
        section: 'home',
        content: 'Some body content',
      };

      const createdEntity = { ...mockContent, title: 'New Content', section: 'home' };
      mockRepository.create.mockReturnValue(createdEntity);
      mockRepository.save.mockResolvedValue(createdEntity);

      const result = await service.create(createInput);
      expect(result).toEqual(createdEntity);
      expect(mockRepository.create).toHaveBeenCalledWith(createInput);
      expect(mockRepository.save).toHaveBeenCalledWith(createdEntity);
    });
  });

  describe('update', () => {
    it('should update and return existing content', async () => {
      const updateInput = { id: 1, title: 'Updated Title' };
      const existing = { ...mockContent };
      const updated = { ...mockContent, title: 'Updated Title' };

      mockRepository.findOne.mockResolvedValue(existing);
      mockRepository.save.mockResolvedValue(updated);

      const result = await service.update(1, updateInput);
      expect(result.title).toBe('Updated Title');
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException when updating non-existent content', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(
        service.update(999, { id: 999, title: 'Whatever' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should return true when content is deleted', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });
      const result = await service.remove(1);
      expect(result).toBe(true);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should return false when content does not exist', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });
      const result = await service.remove(999);
      expect(result).toBe(false);
    });
  });
});
