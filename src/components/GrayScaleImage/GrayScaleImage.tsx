import React, { memo } from 'react';
import { View } from 'react-native';
import { Grayscale } from 'react-native-color-matrix-image-filters';

import { Props } from './types';

const GrayScaleImage: React.FC<Props> = ({ isFocus, children }) => {
  return (
    <View style={!isFocus && { opacity: 0.6 }}>
      {isFocus ? children : <Grayscale>{children}</Grayscale>}
    </View>
  );
};

export default memo(GrayScaleImage);
