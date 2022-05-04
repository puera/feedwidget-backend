import { Feedback } from '@prisma/client';
import { prisma } from '../../prisma';
import { IFeedbacksRepository } from '../FeedbacksRepository';

export class PrismaFeedbacksRepository implements IFeedbacksRepository {
  async create({ type, comment, screenshot }: Omit<Feedback, 'id'>) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    });
  }
}
