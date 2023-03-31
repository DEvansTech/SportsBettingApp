import React, {
  useState,
  useContext,
  useRef,
  useCallback,
  ReactElement,
  useEffect
} from 'react';
import { Container, View, Text, CheckBox } from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import firestore from '@react-native-firebase/firestore';

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
  const [checkShow, setCheckShow] = useState(false);

  const _renderItem = useCallback(({ item }: ICarouselItem) => {
    return item;
  }, []);

  const nextPage = () => {
    carouselRef.current?.snapToNext();
  };

  const prevPage = () => {
    carouselRef.current?.snapToPrev();
  };

  const handleCheckShow = async (value: boolean) => {
    setCheckShow(!value);
    const docRef = await firestore().collection('users').doc(user.uid);
    const userData = {
      introPage: !value
    };
    docRef.get().then(thisDoc => {
      if (thisDoc.exists) {
        docRef.update(userData);
      }
    });
  };

  useEffect(() => {
    (async function () {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((doc: any) => {
          console.log('doc.data().introPage==>', doc.data().introPage);
          setCheckShow(doc.data().introPage);
        });
    })();
  }, []);

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
      <View style={styles.showCheck}>
        <CheckBox
          color={Colors.green}
          checked={checkShow}
          onPress={() => handleCheckShow(checkShow)}
        />
        <Text style={styles.messageText}>Do not show again on startup</Text>
      </View>
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
