import { darken } from 'polished';
import { Pressable, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import palette from '~/theme/palette';
import { ButtonStyle } from './types';

export const Container = styled(Pressable).attrs((props: ButtonStyle) => ({
  android_ripple: {
    color: darken(
      0.2,
      props.backgroundColor ? props.backgroundColor : palette.primary,
    ),
    borderless: false,
    radius: Dimensions.get('screen').width - 32,
  },
}))<ButtonStyle>`
  height: 56px;
  padding: 0 16px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text.attrs({ size: 16 })<ButtonStyle>`
  color: ${props => (props.textColor ? props.textColor : palette.white)};
  margin: 0 8px;
`;
