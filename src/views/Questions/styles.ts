import styled from 'styled-components/native';
import { GlobalContainer } from '~/theme/global';
import palette from '~/theme/palette';

export const Container = styled(GlobalContainer)`
  flex: 1;
  background-color: ${palette.white};
`;
