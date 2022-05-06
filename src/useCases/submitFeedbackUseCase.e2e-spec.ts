import request from 'supertest'
import { app } from '../app'

describe('[e2e] SubmitFeedbackUseCase', () => {

  test('[e2e] CreateFeedback', async () => {
    const response = await request(app)
      .post('/feedback')
      .send({ 
        type: 'bug',
        comment: 'teste',
        screenshot: 'data:image/png;base64,66464646d' 
      });

    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
  })
})