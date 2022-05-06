export interface IFeedbackCreateData{
  type:       string,
  comment:    string,
  screenshot?: string;
}

export interface FeedbackRepository {
  create: (data: IFeedbackCreateData) => Promise<IFeedbackCreateData | void>;
}