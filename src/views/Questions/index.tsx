import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '~/contexts/App';

import Button from '~/components/Button';
import Header from '~/components/Header';
import MenuCard from '~/components/MenuCard';

import { getQuestionsController } from '~/controller/questionController';
import { shuffleAnswerController } from '~/controller/shuffleAnswerController';
import Question, {
  ControlLevelType,
  DifficultyType,
  HistoryAnswers,
} from '~/models/questionModel';

import palette from '~/theme/palette';
import { Container } from './styles';

const Questions: React.FC = () => {
  const { state, handle } = useApp();
  const navigation = useNavigation();

  const [answers, setAnswers] = useState<string[]>([]);
  const [historyAnswers, setHistoryAnswers] = useState<HistoryAnswers>({
    easy: { correct: 0, incorrect: 0 },
    medium: { correct: 0, incorrect: 0 },
    hard: { correct: 0, incorrect: 0 },
  });
  const [controlLevel, setControlLevel] = useState<ControlLevelType>('start');
  const [selectAnswer, setSelectAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [totalQuestion, setTotalQuestion] = useState(0);

  const searchQuestion = useCallback(async () => {
    const { selectedCategoryId, difficulty } = state;
    const question = await getQuestionsController(
      selectedCategoryId,
      difficulty,
    );
    if (question) {
      const resultAnswers = shuffleAnswerController(
        question.correctAnswer,
        question.incorrectAnswers,
      );
      setAnswers(resultAnswers);
      setCurrentQuestion(question);
    }
  }, [state]);

  useEffect(() => {
    searchQuestion();
  }, [searchQuestion]);

  const handleAnswer = (answer: string) => {
    setSelectAnswer(answer);
  };

  const handleSubmit = () => {
    if (currentQuestion) {
      const isCorrect = selectAnswer === currentQuestion.correctAnswer;
      if (isCorrect) {
        const itemHistory = historyAnswers[state.difficulty];
        itemHistory.correct += 1;
        setHistoryAnswers({ ...historyAnswers });
        setControlLevel(controlLevel === 'correct' ? 'start' : 'correct');
      } else {
        const itemHistory = historyAnswers[state.difficulty];
        itemHistory.incorrect += 1;
        setHistoryAnswers({ ...historyAnswers });
        setControlLevel(controlLevel === 'incorrect' ? 'start' : 'incorrect');
      }

      if (controlLevel === 'correct') {
        const nextLevel: DifficultyType =
          state.difficulty === 'easy' ? 'medium' : 'hard';
        handle.setDifficulty(nextLevel);
      } else if (controlLevel === 'incorrect') {
        const nextLevel: DifficultyType =
          state.difficulty === 'hard' ? 'medium' : 'easy';
        handle.setDifficulty(nextLevel);
      }
      if (totalQuestion <= 9) {
        searchQuestion();
      } else {
        setTotalQuestion(totalQuestion + 1);
        // mostra alerta com historico de resultados
      }
    }
  };

  const renderMenu = () => {
    return (
      <View>
        <FlatList
          keyExtractor={item => item}
          data={answers}
          renderItem={({ item }) => (
            <MenuCard
              title={item}
              cardColor={palette.white}
              callback={() => handleAnswer(item)}
              selected={selectAnswer === item}
            />
          )}
        />
      </View>
    );
  };

  return (
    <Container>
      <Header title="Dev Mobile" />
      <>
        <View>
          {renderMenu()}
          <Button
            style={{ backgroundColor: palette.whiteTransparent }}
            title="Resposta"
            handleClick={() => handleSubmit()}
          />
        </View>
      </>
    </Container>
  );
};

export default Questions;
