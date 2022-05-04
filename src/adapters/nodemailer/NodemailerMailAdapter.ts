import nodemailer from 'nodemailer';
import { IMailAdapter, ISendMailData } from '../MailAdapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '11b1f973057443',
    pass: 'c041ab52935298'
  }
});

export class NodemailerMailAdatper implements IMailAdapter {
  async sendMail({ body, subject }: ISendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <noreply@feedget.com>',
      to: 'Renann Souza <renann_puera@hotmail.com>',
      subject,
      html: body
    });
  }
}
