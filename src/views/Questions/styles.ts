import styled from 'styled-components/native';
import { GlobalContainer } from '~/theme/global';
import palette from '~/theme/palette';

export const Container = styled(GlobalContainer)`
  flex: 1;
  background-color: ${palette.white};
`;
export const ContainerResult = styled.Text`
  color: ${palette.dark};
  margin-left: 24px;
  font-size: 20px;
  padding: 12px;
`;

export const ContainerDetails = styled.Text`
  color: ${palette.sucess};
  margin-left: 28px;
  padding: 4px;
`;

export const ContainerText = styled.Text`
  color: ${palette.primaryDark};
  margin-left: 20px;
  font-size: 20px;
  padding: 20px 0 20px 0;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 8px;
`;

export const ContainerHeaderText = styled.Text`
  color: ${palette.primary};
  font-size: 20px;
`;
