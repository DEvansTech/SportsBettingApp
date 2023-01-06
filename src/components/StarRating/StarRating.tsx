import React, { useEffect, useState } from 'react';
import { View, Icon, Text } from 'native-base';

import { Props } from './types';
import styles from './styles';

const StarRating: React.FC<Props> = ({ value }) => {
  const [stars, setStars] = useState<any>([]);
  useEffect(() => {
    const Size = Number(value);
    const starsArr = [];
    for (var i = 1; i <= 5; i++) {
      if (Number(Size) >= i) {
        starsArr.push(
          <Icon
            key={i}
            style={styles.fillIcon}
            type="Ionicons"
            name="md-star"
          />
        );
      } else {
        starsArr.push(
          <Icon
            key={i}
            style={styles.emptyIcon}
            type="Ionicons"
            name="star-outline"
          />
        );
      }
    }
    setStars(starsArr);
  }, [value]);
  return (
    <View style={styles.scoreView}>
      {value ? stars : <Text style={styles.notRatedText}>Not Rated</Text>}
    </View>
  );
};

export default StarRating;
