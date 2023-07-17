import React, {
  useState,
  useContext,
  useRef,
  useCallback,
  ReactElement
} from 'react';
import { Container } from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import { AuthContext, AuthContextType } from '@Context/AuthContext';
import QuickStart from './QuickStart';
import Games from './Games';
import Spread from './Spread';
import OBISays from './OBISays';
import Watching from './Watching';
import Feedback from './Feedback';

import { Routes } from '@Navigators/routes';
import styles, { deviceWidth } from './styles';
import { Colors } from '@Theme';

type ICarouselItem = {
  item: ReactElement;
  index: number;
};

const Introduction: React.FC = () => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const carouselRef = useRef<any>(null);
  const navigation = useNavigation<StackNavigationProp<any, any>>();

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

  const closePage = () => {
    if (user) {
      return navigation.navigate(Routes.TabRoute);
    }
    return navigation.navigate(Routes.Splash);
  };

  // const handleCheckShow = async (value: boolean) => {
  //   setCheckShow(!value);
  //   const docRef = await firestore().collection('users').doc(user.uid);
  //   const userData = {
  //     introPage: !value
  //   };
  //   docRef.get().then(thisDoc => {
  //     if (thisDoc.exists) {
  //       docRef.update(userData);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   (async function () {
  //     if (user) {
  //       await firestore()
  //         .collection('users')
  //         .doc(user.uid)
  //         .get()
  //         .then((doc: any) => {
  //           setCheckShow(doc.data().introPage);
  //         });
  //     }
  //   })();
  // }, []);

  const data = [
    <QuickStart
      nextPage={nextPage}
      prevPage={prevPage}
      closePage={closePage}
    />,
    <Games nextPage={nextPage} prevPage={prevPage} closePage={closePage} />,
    <Spread nextPage={nextPage} prevPage={prevPage} closePage={closePage} />,
    // <Win nextPage={nextPage} prevPage={prevPage} closePage={closePage} />,
    // <OverUnder nextPage={nextPage} prevPage={prevPage} closePage={closePage} />,
    <OBISays nextPage={nextPage} prevPage={prevPage} closePage={closePage} />,
    <Watching nextPage={nextPage} prevPage={prevPage} closePage={closePage} />,
    // <Partners nextPage={nextPage} prevPage={prevPage} closePage={closePage} />,
    <Feedback nextPage={nextPage} prevPage={prevPage} closePage={closePage} />
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
      {/* {user && (
        <View style={styles.showCheck}>
          <CheckBox
            color={Colors.green}
            checked={checkShow}
            onPress={() => handleCheckShow(checkShow)}
          />
          <Text style={styles.messageText}>Do not show again on startup</Text>
        </View>
      )} */}
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
        inactiveDotStyle={{
          backgroundColor: Colors.darkerGrey
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </Container>
  );
};

export default Introduction;
