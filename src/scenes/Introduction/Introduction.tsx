import React, {
  useState,
  useContext,
  useRef,
  useCallback,
  ReactElement
} from 'react';
import { Container } from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { AuthContext, AuthContextType } from '@Context/AuthContext';
import FirstScreen from './First';
import SecondScreen from './Second';
import ThirdScreen from './Third';
import FourthScreen from './Fourth';
import FifthScreen from './Fifth';
import SixthScreen from './Sixth';
import SeventhScreen from './Seventh';
import EighthScreen from './Eighth';

import styles, { deviceWidth } from './styles';
import { Colors } from '@Theme';

type ICarouselItem = {
  item: ReactElement;
  index: number;
};

const Introduction: React.FC = () => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const carouselRef = useRef<any>(null);

  const [activeSlide, setActiveSlide] = useState(0);

  const _renderItem = useCallback(({ item }: ICarouselItem) => {
    return item;
  }, []);

  const nextPage = () => {
    carouselRef.current?.snapToNext();
  };

  const prevPage = () => {
    carouselRef.current?.snapToPrev();
  };

  const data = [
    <FirstScreen nextPage={nextPage} prevPage={prevPage} />,
    <SecondScreen nextPage={nextPage} prevPage={prevPage} />,
    <ThirdScreen nextPage={nextPage} prevPage={prevPage} />,
    <FourthScreen nextPage={nextPage} prevPage={prevPage} />,
    <FifthScreen nextPage={nextPage} prevPage={prevPage} />,
    <SixthScreen nextPage={nextPage} prevPage={prevPage} />,
    <SeventhScreen nextPage={nextPage} prevPage={prevPage} />,
    <EighthScreen nextPage={nextPage} prevPage={prevPage} />
  ];

  return (
    <Container style={styles.background}>
      <Carousel
        ref={carouselRef}
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
