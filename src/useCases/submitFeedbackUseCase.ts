import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbackRepository } from "../repositories/feedbackRepository";

interface SubmitFeedbackUseCaseRequest{
  type:       string,
  comment:    string,
  screenshot?: string
}

export class SubmitFeedbackUseCase{
  
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly mailAdapter: MailAdapter,
  ){}

  public async execute(request: SubmitFeedbackUseCaseRequest){
    const {type, comment, screenshot} = request;

    if(!type){
      throw new Error('Type is required!');
    }

    if(!comment){
      throw new Error('Comment is required!');
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
     throw new Error('Invalid screenshot format!');
    }

    this.feedbackRepository.create({type, comment, screenshot});

    const body =  [
      '<div style="font-family: sans-serif; font-size:12px color:#111">',
      '<p>Novo feedback recebido!</p>',
      '<p>Tipo: ' + type + '</p>',
      '<p>Comentário: ' + comment + '</p>',
      screenshot ? '<p>Screenshot: <img width="700" height="400" src="' + screenshot + '"/></p>' : '',
      '</div>'
    ].join('\n')

    await this.mailAdapter.send({subject: 'Novo feedback recebido!', body});
  }
}