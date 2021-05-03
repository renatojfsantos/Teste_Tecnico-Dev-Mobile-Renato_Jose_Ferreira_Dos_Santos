export default interface Question {
  category: string;
  type: string;
  difficulty: DifficultyType;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}

export type DifficultyType = 'easy' | 'medium' | 'hard';

export class HistoryAnswers {
  easy: CounterAnswers = { correct: 0, incorrect: 0 };

  medium: CounterAnswers = { correct: 0, incorrect: 0 };

  hard: CounterAnswers = { correct: 0, incorrect: 0 };

  constructor(params?: Partial<HistoryAnswers>) {
    if (params) {
      Object.assign(this, params);
    }
  }

  public getCorrectsCount() {
    return this.easy.correct + this.medium.correct + this.hard.correct;
  }

  public getIncorrectsCount() {
    return this.easy.incorrect + this.medium.incorrect + this.hard.incorrect;
  }
}

export interface CounterAnswers {
  correct: number;
  incorrect: number;
}

export type ControlLevelType = 'start' | 'correct' | 'incorrect' | 'end';
