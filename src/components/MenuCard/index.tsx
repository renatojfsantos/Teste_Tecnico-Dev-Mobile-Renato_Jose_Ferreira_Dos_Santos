import React from 'react';

import { Card, MenuTitle } from './styles';
import { IMenuCards } from './types';

const MenuCard: React.FC<IMenuCards> = props => {
  // eslint-disable-next-line react/prop-types
  const { callback, title, cardColor } = props;

  return (
    <Card onPress={callback} color={cardColor}>
      <MenuTitle>{title}</MenuTitle>
    </Card>
  );
};

export default MenuCard;
