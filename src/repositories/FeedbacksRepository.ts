import { Feedback } from '@prisma/client';

export interface IFeedbacksRepository {
  create: (data: Omit<Feedback, 'id'>) => Promise<void>;
}
