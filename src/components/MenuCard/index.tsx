import React from 'react';
import palette from '~/theme/palette';

import { Card, MenuTitle } from './styles';
import { IMenuCards } from './types';

const MenuCard: React.FC<IMenuCards> = props => {
  // eslint-disable-next-line react/prop-types
  const { callback, title, cardColor, selected } = props;

  return (
    <Card onPress={callback} color={selected ? palette.sucess : cardColor}>
      <MenuTitle>{title}</MenuTitle>
    </Card>
  );
};

export default MenuCard;
