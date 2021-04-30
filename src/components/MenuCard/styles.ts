import styled from 'styled-components/native';
import palette from '~/theme/palette';
import { ICardStyles } from './types';

export const Card = styled.TouchableOpacity<ICardStyles>`
  width: 90%;
  height: 80px;
  margin: 8px 5%;
  padding: 4px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  border: 2px ${palette.primary};
  background-color: ${props => props.color || palette.white};
`;

export const MenuTitle = styled.Text.attrs({ color: palette.white, size: 12 })`
  margin-top: 12px;
`;
