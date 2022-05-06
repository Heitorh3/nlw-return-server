import { SubmitFeedbackUseCase } from './submitFeedbackUseCase';

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  {create: createFeedbackSpy},
  {send: sendEmailSpy}
);

describe('SubmitFeedbackUseCase', () => {

  it('Should be able to submit a feedback', async () => {

      await expect(submitFeedback.execute({
        type: 'bug',
        comment: 'teste',
        screenshot: 'data:image/png;base64,66464646dfasdf'
      })).resolves.not.toThrowError();

      expect(createFeedbackSpy).toHaveBeenCalled();
      expect(sendEmailSpy).toHaveBeenCalled();
  })

  it('Should not be able to submit a feedback without type', async () => {

    await expect(submitFeedback.execute({
      type: '',
      comment: 'teste',
      screenshot: 'data:image/png;base64,66464646dfasdf'
    })).rejects.toThrowError();
  })

  it('Should not be able to submit a feedback without comment', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,66464646dfasdf'
    })).rejects.toThrowError();
  })

  it('Should not be able to submit a feedback with an invalid screenshot', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Erro ao me inscrever',
      screenshot: 'screenshot.png'
    })).rejects.toThrowError();
  })
})