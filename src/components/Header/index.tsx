import React from 'react';
import palette from '~/theme/palette';

import {
  Container,
  LeftBox,
  SubTitleHeader,
  TitleBox,
  TitleHeader,
} from './styles';
import { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = props => {
  const { title, subtitle, leftClick, children } = props;
  return (
    <Container>
      <LeftBox>
        <TitleBox>
          <TitleHeader whiteSubtitle={!!subtitle}>{title}</TitleHeader>
          {!!subtitle && <SubTitleHeader>{subtitle}</SubTitleHeader>}
        </TitleBox>
      </LeftBox>
    </Container>
  );
};

export default Header;
