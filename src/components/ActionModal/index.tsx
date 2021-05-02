import React from 'react';
import { Dimensions, Pressable, Text } from 'react-native';
import palette from '~/theme/palette';
import { ActionModalProps } from './types';

const ActionModal: React.FC<ActionModalProps> = props => {
  // eslint-disable-next-line react/prop-types
  const { title, textColor, onPress, onLongPress } = props;

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      android_ripple={{
        color: palette.primaryDark,
        radius: Dimensions.get('screen').width - 32,
      }}
      style={{ height: 56, paddingHorizontal: 16, justifyContent: 'center' }}
    >
      <Text style={{ fontSize: 19, backgroundColor: textColor }}>{title}</Text>
    </Pressable>
  );
};

export default ActionModal;
