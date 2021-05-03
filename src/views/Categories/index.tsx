import React from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '~/contexts/App';

import Header from '~/components/Header';
import Button from '~/components/Button';
import palette from '~/theme/palette';

import { Container, ContainerText } from './styles';

const Categories: React.FC = () => {
  const { state, handle } = useApp();
  const navigation = useNavigation();

  const handleGoQuestions = (categoryId: number) => {
    handle.setSelectedCategoryId(categoryId);
    navigation.navigate('Questions');
  };

  return (
    <Container>
      <Header title="Dev Mobile" />
      <ContainerText>Categorias</ContainerText>
      <FlatList
        keyExtractor={item => String(item.id)}
        data={state.categories}
        renderItem={({ item }) => (
          <Button
            backgroundColor={palette.white}
            handleClick={() => handleGoQuestions(item.id)}
            title={item.name}
          />
        )}
      />
    </Container>
  );
};

export default Categories;
