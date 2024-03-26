import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionsEntity } from './entities/question.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionsEntity)
    private questionsRepository: Repository<QuestionsEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(dto: CreateQuestionDto): Promise<QuestionsEntity> {
    const { userId, title, description } = dto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    const newQuestion = this.questionsRepository.create({
      user,
      title,
      description,
    });
    return this.questionsRepository.save(newQuestion);
  }

  findOne(id: number) {
    return this.questionsRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.questionsRepository.delete(id);
  }
}
