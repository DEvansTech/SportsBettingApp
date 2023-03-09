import React, { useContext, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Container, Content, Button, Text, View } from 'native-base';

import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { Button as CustomButton } from '@Components';
import { Routes } from '@Navigators/routes';
import { Images, Colors } from '@Theme';

import styles from './styles';

const Splash: React.FC = () => {
  const { setUser, user, setDisplayName } = useContext(
    AuthContext
  ) as AuthContextType;
  const navigation = useNavigation<StackNavigationProp<any, any>>();

  const navigateTo = (route: string) => {
    navigation.navigate(route);
  };

  const getUserName = async () => {
    if (user) {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((doc: any) => {
          const currentUser = doc.data();
          if (currentUser) {
            setDisplayName(currentUser.firstName + ' ' + currentUser.lastName);
          }
        });
    }
  };

  const logIn = () => {
    if (user) {
      getUserName();
      navigation.navigate(Routes.DrawerRoute);
    } else {
      navigation.navigate(Routes.Login);
    }
  };

  const onAuthStateChanged = (authUser: any) => {
    setUser(authUser);
  };

  useEffect(() => {
    if (user) {
      getUserName();
      navigation.navigate(Routes.DrawerRoute);
    }
  }, [user]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <Container style={styles.background}>
      <ImageBackground
        source={Images.splash}
        resizeMode="stretch"
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}>
        <Content
          contentContainerStyle={styles.contentView}
          scrollEnabled={false}>
          <Button
            rounded
            style={styles.closeBtn}
            onPress={() => navigation.navigate(Routes.DrawerRoute)}>
            <Text style={styles.closeBtnText}>Skip</Text>
          </Button>
          <View style={styles.btnView}>
            <CustomButton
              text="Create an account"
              backgroundColor={Colors.green}
              underlayColor={Colors.black}
              onPress={() => navigateTo(Routes.Register)}
            />
            <CustomButton text="Sign in" onPress={logIn} />
          </View>
        </Content>
      </ImageBackground>
    </Container>
  );
};

export default Splash;
