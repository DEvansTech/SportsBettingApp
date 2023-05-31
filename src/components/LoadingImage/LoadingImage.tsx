import React from 'react';
import { Animated, View } from 'react-native';
import { Props } from './types';
import SvgUri from 'react-native-svg-uri';
import styles from './styles';

const LoadingImage: React.FC<Props> = ({ source, style, type = 'png' }) => {
  const imageAnimated = new Animated.Value(0);

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  };

  return (
    <View style={[styles.container, style]}>
      {type === 'png' ? (
        <Animated.Image
          source={source}
          style={[styles.imageOverlay, { opacity: imageAnimated }]}
          onLoad={onImageLoad}
          resizeMode="contain"
        />
      ) : (
        <SvgUri width={70} height={70} svgXmlData={source} />
      )}
    </View>
  );
};

export default LoadingImage;
