import Question, { DifficultyType } from '~/models/questionModel';
import { getQuestions } from '~/service/apiService';

export const getQuestionsController = async (
  categoryId: number,
  difficulty: DifficultyType,
) => {
  try {
    const response = await getQuestions(categoryId, difficulty);
    if (response) {
      const result = response.results[0];
      const question: Question = {
        category: result.category,
        type: result.type,
        difficulty: result.difficulty,
        question: result.question,
        correctAnswer: result.correct_answer,
        incorrectAnswers: result.incorrect_answer,
      };
      return question;
    }
    return null;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};
