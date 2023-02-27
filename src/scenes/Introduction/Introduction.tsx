import React, { useState, useContext } from 'react';
import { Container } from 'native-base';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import { AuthContext, AuthContextType } from '@Context/AuthContext';
import FirstScreen from './First';

import styles, { deviceWidth } from './styles';
import { Colors } from '@Theme';

const data = [
  { title: 'first', component: <FirstScreen /> },
  { title: 'first', component: <FirstScreen /> }
];

const Introduction: React.FC = () => {
  const { user } = useContext(AuthContext) as AuthContextType;

  const [activeSlide, setActiveSlide] = useState(0);

  const _renderItem = ({ item, index }) => {
    console.log(item, index);
    return <>{item.component}</>;
  };

  return (
    <Container style={styles.background}>
      <Carousel
        data={data}
        renderItem={_renderItem}
        onSnapToItem={(index: number) => setActiveSlide(index)}
        sliderWidth={deviceWidth}
        itemWidth={deviceWidth}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: Colors.lightGrey }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: Colors.green
        }}
        inactiveDotStyle={
          {
            // backgroundColor: Colors.black
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </Container>
  );
};

export default Introduction;
