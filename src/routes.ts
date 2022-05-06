import express from 'express';

import { prismaFeedbackRepository } from './repositories/prisma/prismaFeedbackRepository';
import { SubmitFeedbackUseCase } from './useCases/submitFeedbackUseCase';
import { NodeMailerAdapter } from './adapters/nodemailer/modeMailerAdapter';

export const routes = express.Router();

routes.post('/feedback', async (req, res) => {
  const {type, comment, screenshot} = req.body;

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(new prismaFeedbackRepository(), new NodeMailerAdapter());
  await submitFeedbackUseCase.execute({type, comment, screenshot});
  
  res.status(201).send();
})