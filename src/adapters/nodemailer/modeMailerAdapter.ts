import { MailAdapter, ISendmailData } from "../mailAdapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "26f5f856e1e1f5",
    pass: "24212ce233ee7e"
  }
});

export class NodeMailerAdapter implements MailAdapter {

  async send({subject, body}: ISendmailData): Promise<void> {

    await transport.sendMail({
      from: "Equipe Feedget <feedback@geedget.com>",
      to: "Heitor Neto <heitorh3@gmail.com>",
      subject,
      html: body
    });
  }
}