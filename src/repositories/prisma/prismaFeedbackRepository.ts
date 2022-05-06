import { FeedbackRepository, IFeedbackCreateData } from './../feedbackRepository';
import { prisma }  from '../../prisma';

export class prismaFeedbackRepository implements FeedbackRepository{

  async create({type, comment, screenshot}: IFeedbackCreateData): Promise<IFeedbackCreateData | void> {    
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    })    
  }
}