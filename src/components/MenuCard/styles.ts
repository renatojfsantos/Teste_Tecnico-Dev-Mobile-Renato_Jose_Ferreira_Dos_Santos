import styled from 'styled-components/native';
import palette from '~/theme/palette';
import { ICardStyles } from './types';

export const Card = styled.TouchableOpacity<ICardStyles>`
  width: 120px;
  height: 120px;
  margin: 4px;
  padding: 8px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color || palette.sucess};
`;

export const MenuTitle = styled.Text.attrs({ color: palette.white, size: 12 })`
  margin-top: 12px;
`;
