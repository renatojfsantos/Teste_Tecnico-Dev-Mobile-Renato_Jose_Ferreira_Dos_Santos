import React from 'react';
import { View } from 'react-native';
import palette from '~/theme/palette';

import { Container, Title } from './styles';
import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = props => {
  // eslint-disable-next-line react/prop-types
  const { backgroundColor, textColor, title, handleClick } = props;

  const color = textColor || palette.white;

  function onPress() {
    handleClick();
  }

  function renderChildren() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Title textColor={color}>{title}</Title>
      </View>
    );
  }
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Container backgroundColor={backgroundColor} onPress={onPress} {...props}>
      {renderChildren}
    </Container>
  );
};

export default Button;
