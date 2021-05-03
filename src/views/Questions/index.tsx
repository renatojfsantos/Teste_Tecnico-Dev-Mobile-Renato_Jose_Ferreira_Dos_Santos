import React, { Children, useCallback, useEffect, useState } from 'react';
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
import ActionModal from '~/components/ActionModal';
import Text from '~/components/Text';

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

  // const showAlertHistory =() => {
  // }

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
      <View>
        <FlatList
          ListHeaderComponent={<Text>{currentQuestion?.question}</Text>}
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

  const renderModal = () => {
    let title = '';
    let containDetails = '';
    if (totalQuestion > 9) {
      const sumCorrect = historyAnswers.getCorrectsCount();
      const sumIncorrect = historyAnswers.getIncorrectsCount();
      title += `Você acertou ${sumCorrect} perguntas`;
      title += `Você errou ${sumIncorrect} perguntas`;
      containDetails += `Fácil: ${historyAnswers.easy.correct} acerto e ${historyAnswers.easy.incorrect} erro`;
      containDetails += `Médio: ${historyAnswers.medium.correct} acerto e ${historyAnswers.medium.incorrect} erro`;
      containDetails += `Difícil: ${historyAnswers.hard.correct} acerto e ${historyAnswers.hard.incorrect} erro`;
    } else if (currentQuestion?.correctAnswer === selectAnswer) {
      title = 'Você acertou!';
      containDetails = 'Colocar icone depois!!!';
    } else {
      title = 'Você errou!';
      containDetails = 'Colocar icone depois!!!';
    }
    return (
      <ActionModal title={title} children={<Text>{containDetails}</Text>} />
    );
  };

  return (
    <Container>
      <Header title="Dev Mobile" />
      <>
        <View>
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
        </View>
      </>
    </Container>
  );
};

export default Questions;
