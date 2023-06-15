import React from 'react';
import { Animated, View } from 'react-native';
import { Props } from './types';
import styles from './styles';

const LoadingImage: React.FC<Props> = ({ source, style }) => {
  const imageAnimated = new Animated.Value(0);

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  };

  return (
    <View style={[styles.container, style]}>
      <Animated.Image
        source={source}
        style={[styles.imageOverlay, { opacity: imageAnimated }]}
        onLoad={onImageLoad}
        resizeMode="contain"
      />
    </View>
  );
};

export default LoadingImage;
