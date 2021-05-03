import styled from 'styled-components/native';
import palette from '~/theme/palette';

export const Container = styled.View`
  flex: 1;
  background-color: ${palette.white};
`;

export const ContainerText = styled.Text`
  color: ${palette.primaryDark};
  margin-left: 28px;
  font-size: 24px;
  padding: 20px 0 20px 0;
`;
