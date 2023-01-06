import React from 'react';
import { Grayscale } from 'react-native-color-matrix-image-filters';

import { Props } from './types';

const GrayScaleImage: React.FC<Props> = ({ isFocus, children }) => {
  return <>{isFocus ? children : <Grayscale>{children}</Grayscale>}</>;
};

export default GrayScaleImage;
