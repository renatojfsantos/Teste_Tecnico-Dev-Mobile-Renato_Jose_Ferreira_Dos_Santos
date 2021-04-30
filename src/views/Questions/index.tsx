import React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '~/contexts/App';

import Header from '~/components/Header';
import Button from '~/components/Button';
import MenuCard from '~/components/MenuCard';

import palette from '~/theme/palette';
import { Container } from './styles';

const Questions: React.FC = () => {
  const { state, handle } = useApp();
  const navigation = useNavigation();

  const renderMenu = () => {
    return (
      <View>
        <ScrollView>
          {state.categories.map(renderList => (
            <MenuCard
              key={renderList}
              title={renderList.name}
              cardColor={palette.sucess}
              callback={() => navigation.goBack()}
            />
          ))}
        </ScrollView>
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
            title="Voltar"
            handleClick={() => navigation.goBack()}
          />
        </View>
      </>
    </Container>
  );
};

export default Questions;
