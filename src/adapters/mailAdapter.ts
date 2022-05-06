export interface ISendmailData{
  subject: string;
  body: string
}

export interface MailAdapter{
  send(data: ISendmailData): Promise<void>;
}