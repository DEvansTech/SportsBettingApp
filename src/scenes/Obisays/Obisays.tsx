import React, { useEffect } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Content, Text, View, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainHeader, LogoSpinner } from '@Components';
// import { Images } from '@Theme';
import { Routes } from '@Navigators/routes';
import { getObiDta } from '@Store/obi/actions';
import { RootState } from '@Store/store';

import styles from './styles';

const Obisays: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const dispatch = useDispatch();

  const { loading, obiData } = useSelector((state: RootState) => state.obi);

  useEffect(() => {
    dispatch(getObiDta());
  }, []);

  return (
    <Container style={styles.background}>
      <MainHeader />
      <View style={styles.header}>
        <Text style={styles.headerText}>OBI Says</Text>
      </View>
      {loading ? (
        <LogoSpinner />
      ) : (
        <Content contentContainerStyle={styles.contentView}>
          {obiData?.length > 0 ? (
            obiData.map((obi: any, index: number) => (
              <TouchableOpacity
                key={index}
                style={styles.obisayList}
                onPress={() =>
                  navigation.navigate(Routes.OBIDetail, { obiData: obi })
                }>
                <Text style={styles.listTitleText}>{obi?.title}</Text>
                <Icon
                  type="SimpleLineIcons"
                  name="arrow-right"
                  style={styles.rightArrowIcon}
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text>There is no Data</Text>
          )}

          {/* <TouchableOpacity
            style={styles.obisayList}
            onPress={() => navigation.navigate(Routes.OBIBooks)}>
            <Text style={styles.listTitleText}>OBI Reads Books!</Text>
            <Icon
              type="SimpleLineIcons"
              name="arrow-right"
              style={styles.rightArrowIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.obisayList}
            onPress={() => navigation.navigate(Routes.OBILineRater)}>
            <Text style={styles.listTitleText}>OBI LineMaster™</Text>
            <Icon
              type="SimpleLineIcons"
              name="arrow-right"
              style={styles.rightArrowIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.obisayList}
            onPress={() => navigation.navigate(Routes.OBIWeight)}>
            <Text style={styles.listTitleText}>OBI Weighs In</Text>
            <Icon
              type="SimpleLineIcons"
              name="arrow-right"
              style={styles.rightArrowIcon}
            />
          </TouchableOpacity> */}
          {/* <Image source={Images.WordBalloon} style={styles.wordballon} />
          <Image source={Images.ObiLogo} style={styles.obiLogo} /> */}
        </Content>
      )}
    </Container>
  );
};

export default Obisays;
