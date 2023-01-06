import React from 'react';
import { TouchableHighlight, Text } from 'react-native';

import { Colors } from '@Theme';
import styles from './styles';
import { Props } from './types';

const Button: React.FC<Props> = ({
  text,
  onPress,
  backgroundColor = Colors.black,
  underlayColor = Colors.green
}) => {
  return (
    <TouchableHighlight
      style={[styles.btnNormal, { backgroundColor: backgroundColor }]}
      underlayColor={underlayColor}
      onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableHighlight>
  );
};

export default Button;
