import { apiPostQuestionnaire } from '../api/api';

export const postQuestionnaire = async (responses) => {
  try {
    const response = await apiPostQuestionnaire(responses);
    return response;
  } catch (error) {
    console.error('Error submitting questionnaire:', error);
  }
};
