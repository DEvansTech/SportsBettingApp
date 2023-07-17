import React, { useCallback, useEffect } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Header, Content, Text, View, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { SvgXml } from 'react-native-svg';
import { Loading } from '@Components';

import { Routes } from '@Navigators/routes';
import { getObiDta } from '@Store/obi/actions';
import { RootState } from '@Store/store';

import { Colors, Svgs } from '@Theme';
import styles, { scale } from './styles';

const Obisays: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const dispatch = useDispatch();

  const { loading, obiData } = useSelector((state: RootState) => state.obi);

  useEffect(() => {
    dispatch(getObiDta());
  }, []);

  const numberBgStyle = useCallback((number: number) => {
    if (number % 2 === 0) {
      return styles.listNumberBg1;
    }
    return styles.listNumberBg2;
  }, []);

  const renderItem = useCallback(
    ({ item, index }) => (
      <TouchableOpacity
        key={index}
        style={styles.obisayList}
        onPress={() =>
          navigation.navigate(Routes.OBIDetail, { obiData: item })
        }>
        <View style={[styles.listNumber, numberBgStyle(index)]}>
          <Text style={styles.listNumberText}>{index + 1}</Text>
        </View>
        <View style={styles.listDescription}>
          <Text style={styles.listTitleText}>{item?.title}</Text>
          <Icon
            type="SimpleLineIcons"
            name="arrow-right"
            style={styles.rightArrowIcon}
          />
        </View>
      </TouchableOpacity>
    ),
    [obiData]
  );

  return (
    <Container style={styles.background}>
      <Header
        style={styles.header}
        iosBarStyle={'light-content'}
        androidStatusBarColor={Colors.black}>
        <Text style={styles.headerText}>Roi Says</Text>
        <SvgXml
          xml={Svgs.obiWhiteIcon}
          width={38 * scale}
          height={38 * scale}
        />
      </Header>
      {loading ? (
        <Loading />
      ) : (
        <Content contentContainerStyle={styles.contentView}>
          <FlatList
            data={obiData}
            renderItem={renderItem}
            keyExtractor={item => item.order}
            ListEmptyComponent={<Text>There is no Data</Text>}
          />
        </Content>
      )}
    </Container>
  );
};

export default Obisays;
