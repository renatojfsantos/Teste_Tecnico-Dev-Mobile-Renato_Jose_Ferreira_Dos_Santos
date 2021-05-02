export default interface Question {
  category: string;
  type: string;
  difficulty: DifficultyType;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}

export type DifficultyType = 'easy' | 'medium' | 'hard';

export interface HistoryAnswers {
  easy: CounterAnswers;
  medium: CounterAnswers;
  hard: CounterAnswers;
}

export interface CounterAnswers {
  correct: number;
  incorrect: number;
}

export type ControlLevelType = 'start' | 'correct' | 'incorrect' | 'end';
