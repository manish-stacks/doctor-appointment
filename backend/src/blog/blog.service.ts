import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  async create(title: string, content: string, author: string) {
    const blog = this.blogRepository.create({ title, content, author });
    return this.blogRepository.save(blog);
  }

  async findAll() {
    return this.blogRepository.find();
  }

  async findOne(id: number) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  async update(id: number, title: string, content: string, isPublished: boolean) {
    const blog = await this.findOne(id);
    blog.title = title;
    blog.content = content;
    blog.isPublished = isPublished;
    return this.blogRepository.save(blog);
  }

  async delete(id: number) {
    const blog = await this.findOne(id);
    return this.blogRepository.remove(blog);
  }
}
