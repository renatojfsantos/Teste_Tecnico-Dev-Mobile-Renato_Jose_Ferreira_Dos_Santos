import styled from 'styled-components/native';
import { TextDTO } from './types';
import palette from '~/theme/palette';

export const ContainerText = styled.Text`
  color: ${(props: TextDTO) => (props.color ? props.color : palette.dark)};
  font-size: ${(props: TextDTO) => (props.size ? props.size : 14)}px;
`;
