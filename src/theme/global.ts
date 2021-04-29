import styled from 'styled-components/native';
import palette from './palette';

export const GlobalContainer = styled.View`
  flex: 1;
  background-color: ${palette.white};
`;

export const GlobalCard = styled.View.attrs({
  shadowColor: palette.dark,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
})`
  background-color: ${palette.white};
  border-radius: 4px;
`;

export const GlobalBox = styled.View`
  padding: 8px 16px;
`;
