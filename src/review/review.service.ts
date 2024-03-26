import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewEntity } from './entities/review.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateReviewDto): Promise<ReviewEntity> {
    const { userId, comment, rating, title } = dto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    const newReview = this.reviewRepository.create({
      user,
      comment,
      rating,
      title,
    });
    return this.reviewRepository.save(newReview);
  }

  async findOne(id: number): Promise<ReviewEntity> {
    return this.reviewRepository.findOneBy({ id });
  }

  async delete(id: number) {
    return this.reviewRepository.delete(id);
  }
}
