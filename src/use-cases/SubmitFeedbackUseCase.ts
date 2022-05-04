import { Feedback } from '@prisma/client';
import { IMailAdapter } from '../adapters/MailAdapter';
import { IFeedbacksRepository } from '../repositories/FeedbacksRepository';

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: IFeedbacksRepository,
    private mailAdapter: IMailAdapter
  ) {}
  async execute(data: Omit<Feedback, 'id'>) {
    const { type, comment, screenshot } = data;

    if (!type) throw new Error('Type is required');

    if (!comment) throw new Error('Comment is required');

    if (screenshot && !screenshot.startsWith('data:image/png;base64'))
      throw new Error('invalid screenshot format');

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    });

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
        `<p>Tipo de feedback: ${type} </p>`,
        `<p>Comentário: ${comment} </p>`,
        `</div>`
      ].join('\n')
    });
  }
}
