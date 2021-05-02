import React from 'react';

import { ContainerText } from './styles';
import { TextDTO } from './types';

const Text: React.FC<TextDTO> = props => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ContainerText {...props}>{children}</ContainerText>;
};

export default Text;
