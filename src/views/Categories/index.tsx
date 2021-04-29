import React from 'react';
import { View, FlatList } from 'react-native';
import Header from '~/components/Header';
import { useApp } from '~/contexts/App';
import { Category as CategoryTypes } from '~/contexts/App/types';

import { Container } from './styles';

const Categories: React.FC = () => {
  const { state, handle } = useApp();

  const renderList = (category: CategoryTypes) => {
    return (
      <FlatList
        key={category.id}
        onPress={() => handle.setSelectedCategoryId(category.id)}
      >
        {category.name}
      </FlatList>
    );
  };

  return (
    <View>
      {state.selectedCategoryId}
      {state.load ? 'loading....' : state.categories.map(renderList)}
    </View>
  );

  return (
    <Container>
      <Header title="Dev Mobile" />
    </Container>
  );
};

export default Categories;
