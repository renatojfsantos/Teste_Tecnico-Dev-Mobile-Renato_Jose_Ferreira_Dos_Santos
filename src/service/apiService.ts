import { DifficultyType } from '~/models/questionModel';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getCategories = async () => {
  try {
    const result = await fetch('https://opentdb.com/api_category.php');
    return await result.json();
  } catch (error) {
    console.log('error', error);
    return [];
  }
};

export const getQuestions = async (
  categoryId: number,
  difficulty: DifficultyType,
) => {
  try {
    const result = await fetch(
      `https://opentdb.com/api.php?amount=1&category=${categoryId}&difficulty=${difficulty}&type=multiple`,
    );
    return await result.json();
  } catch (error) {
    console.log('error', error);
    return null;
  }
};
