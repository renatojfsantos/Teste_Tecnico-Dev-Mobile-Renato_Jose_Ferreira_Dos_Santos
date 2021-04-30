import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import Header from '~/components/Header';
import { useApp } from '~/contexts/App';
import { Category as CategoryTypes } from '~/contexts/App/types';

import { Container } from './styles';
import Button from '~/components/Button';
import palette from '~/theme/palette';

const Categories: React.FC = () => {
  const { state, handle } = useApp();
  const navigation = useNavigation();

  const renderList = (category: CategoryTypes) => {
    return <Text key={category.id}>{category.name}</Text>;
  };

  return (
    <Container>
      <Header title="Dev Mobile" />
      <>
        <View>{state.categories.map(renderList)}</View>
        <Button
          style={{ backgroundColor: palette.whiteTransparent }}
          title="Navegação"
          handleClick={() => {
            navigation.navigate('Questions');
          }}
        />
      </>
    </Container>
  );

  // return (
  //   <View>
  //     <Text>{state.selectedCategoryId}</Text>
  //     {state.load ? <Text>'loading....'</Text> : state.categories.map(renderList)}
  //   </View>
  // );
};

export default Categories;
