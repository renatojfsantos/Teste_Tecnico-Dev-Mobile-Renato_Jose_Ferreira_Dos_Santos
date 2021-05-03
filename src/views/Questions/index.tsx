import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '~/contexts/App';

import { getQuestionsController } from '~/controller/questionController';
import { shuffleAnswerController } from '~/controller/shuffleAnswerController';
import Question, {
  ControlLevelType,
  DifficultyType,
  HistoryAnswers,
} from '~/models/questionModel';

import Button from '~/components/Button';
import Header from '~/components/Header';
import MenuCard from '~/components/MenuCard';
import palette from '~/theme/palette';

import {
  Container,
  ContainerText,
  ContainerDetails,
  ContainerResult,
  ContainerHeader,
  ContainerHeaderText,
} from './styles';

const Questions: React.FC = () => {
  const { state, handle } = useApp();
  const navigation = useNavigation();

  const [answers, setAnswers] = useState<string[]>([]);
  const [historyAnswers, setHistoryAnswers] = useState<HistoryAnswers>(
    new HistoryAnswers(),
  );
  const [controlLevel, setControlLevel] = useState<ControlLevelType>('start');
  const [selectAnswer, setSelectAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const searchQuestion = useCallback(
    async (difficultyType: DifficultyType) => {
      const question = await getQuestionsController(
        state.selectedCategoryId,
        difficultyType,
      );
      if (question) {
        const resultAnswers = shuffleAnswerController(
          question.correctAnswer,
          question.incorrectAnswers,
        );
        setAnswers(resultAnswers);
        setCurrentQuestion(question);
        console.log('RESPOSTA CORRETA>>>>>', question.correctAnswer);
      }
    },
    [state.selectedCategoryId],
  );

  useEffect(() => {
    searchQuestion('easy');
  }, [searchQuestion]);

  const handleAnswer = (answer: string) => {
    setSelectAnswer(answer);
  };

  const handleSubmit = () => {
    if (currentQuestion && totalQuestion <= 9) {
      const isCorrect = selectAnswer === currentQuestion.correctAnswer;
      if (isCorrect) {
        const itemHistory = historyAnswers[state.difficulty];
        itemHistory.correct += 1;
        setHistoryAnswers(new HistoryAnswers({ ...historyAnswers }));
        setControlLevel(controlLevel === 'correct' ? 'start' : 'correct');
      } else {
        const itemHistory = historyAnswers[state.difficulty];
        itemHistory.incorrect += 1;
        setHistoryAnswers(new HistoryAnswers({ ...historyAnswers }));
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
      searchQuestion(state.difficulty);
      setTotalQuestion(totalQuestion + 1);
      setShowModal(false);
    }
    setSelectAnswer('');
  };

  const confirmAnswer = () => {
    setShowModal(true);
  };

  const renderMenu = () => {
    return (
      <>
        <ContainerHeader>
          <ContainerHeaderText>
            Questão {totalQuestion === 0 ? totalQuestion + 1 : totalQuestion}
          </ContainerHeaderText>
          <ContainerHeaderText>Nivel {state.difficulty}</ContainerHeaderText>
        </ContainerHeader>
        <FlatList
          ListHeaderComponent={
            <ContainerText>{currentQuestion?.question}</ContainerText>
          }
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
      </>
    );
  };

  const renderModal = () => {
    let title = '';
    let containDetails = '';
    if (totalQuestion > 9) {
      const sumCorrect = historyAnswers.getCorrectsCount();
      const sumIncorrect = historyAnswers.getIncorrectsCount();
      title += `${sumCorrect} respostas corretas.\n`;
      title += `${sumIncorrect} respostas erradas.`;
      containDetails += `Fácil: ${historyAnswers.easy.correct} acerto(s) e ${historyAnswers.easy.incorrect} erro(s)\n`;
      containDetails += `Médio: ${historyAnswers.medium.correct} acerto(s) e ${historyAnswers.medium.incorrect} erro(s)\n`;
      containDetails += `Difícil: ${historyAnswers.hard.correct} acerto(s) e ${historyAnswers.hard.incorrect} erro(s)`;
    } else if (currentQuestion?.correctAnswer === selectAnswer) {
      title = 'Você acertou!';
    } else {
      title = 'Você errou!';
    }
    return (
      <View>
        <ContainerResult>{title}</ContainerResult>
        <ContainerDetails>{containDetails}</ContainerDetails>
      </View>
    );
  };

  return (
    <Container>
      <Header title="Dev Mobile" />
      <>
        {renderMenu()}
        {showModal && renderModal()}
        {!!selectAnswer && (
          <Button
            style={{ backgroundColor: palette.whiteTransparent }}
            title={showModal ? 'Avançar' : 'Responder'}
            handleClick={() => {
              if (showModal) {
                if (totalQuestion > 9) {
                  navigation.goBack();
                }
                handleSubmit();
              } else confirmAnswer();
            }}
          />
        )}
      </>
    </Container>
  );
};

export default Questions;
