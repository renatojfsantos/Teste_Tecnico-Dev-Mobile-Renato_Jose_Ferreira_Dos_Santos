import { TouchableOpacityProps } from 'react-native';

export interface ButtonStyle {
  textColor?: string;
  backgroundColor?: string;
}

export interface ButtonProps extends ButtonStyle, TouchableOpacityProps {
  title?: string;
  handleClick: () => void;
}
