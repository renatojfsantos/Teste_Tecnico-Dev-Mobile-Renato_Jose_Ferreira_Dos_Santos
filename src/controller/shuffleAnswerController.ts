export const shuffleAnswerController = (
  correctAnswer: string,
  incorrectAnswer: string[],
) => {
  const positionCorrectAnswer = Math.floor(
    Math.random() * incorrectAnswer.length,
  );
  const resultAnswers = [...incorrectAnswer];
  resultAnswers.splice(positionCorrectAnswer, 0, correctAnswer);
  return resultAnswers;
};
