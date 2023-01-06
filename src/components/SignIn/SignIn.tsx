import React, { useState, useContext, useEffect } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { Content, Button, Icon, Text, View } from 'native-base';

import { LogoSpinner } from '@Components';
import { Routes } from '@Navigators/routes';
import { WEB_CLIENT_ID } from '@env';
import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { Images } from '@Theme';

import styles from './styles';

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  offlineAccess: false
});

const SignIn: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const { user, setUser, setDisplayName } = useContext(
    AuthContext
  ) as AuthContextType;

  const [loading, setLoading] = useState(false);

  const onGoogleLogin = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = await auth.GoogleAuthProvider.credential(
        idToken
      );
      const result = await auth().signInWithCredential(googleCredential);
      const currentUser = await GoogleSignin.getCurrentUser();
      if (currentUser && result) {
        const userData = {
          uid: result.user.uid,
          email: currentUser.user.email,
          firstName: currentUser.user.givenName,
          lastName: currentUser.user.familyName,
          registerType: 'google'
        };
        const docRef = firestore().collection('users').doc(result.user.uid);
        docRef.get().then(thisDoc => {
          if (!thisDoc.exists) {
            docRef.set(userData);
          }
        });
        setDisplayName(
          currentUser.user.givenName + ' ' + currentUser.user.familyName
        );
      }
      setUser(result?.user);
      setLoading(false);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setLoading(false);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setLoading(false);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setLoading(false);
      }
    }
  };

  const onAuthStateChanged = (authUser: any) => {
    setUser(authUser);
  };

  const signIn = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.Login }]
    });
  };

  const signUp = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.Register }]
    });
  };

  useEffect(() => {
    if (user) {
      navigation.navigate(Routes.DrawerNav);
    }
  }, [user]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <Content contentContainerStyle={styles.contentView} scrollEnabled={false}>
      {loading ? (
        <LogoSpinner />
      ) : (
        <ImageBackground
          source={Images.background}
          resizeMode="cover"
          style={styles.backgroundImage}>
          <View style={styles.container}>
            <Text style={styles.signTitle}>
              Please sign in to track your favorite teams and bets.
            </Text>
            <View style={styles.loginFormBtns}>
              <Button full rounded style={styles.loginBtn} onPress={signIn}>
                <Text style={styles.buttonWhiteText}>Sign In</Text>
              </Button>
              <Button
                full
                rounded
                light
                style={styles.loginFormNeedBtn}
                onPress={signUp}>
                <Text style={styles.buttonBlackText}>Need an Account?</Text>
              </Button>
              <Text style={styles.helpText}>Need help signing in?</Text>
            </View>
            <View style={styles.socialBtns}>
              <TouchableOpacity onPress={onGoogleLogin}>
                <Icon
                  type="FontAwesome"
                  name="google"
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
              {Platform.OS === 'ios' && (
                <TouchableOpacity>
                  <Icon
                    type="FontAwesome"
                    name="apple"
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity>
                <Icon
                  type="MaterialIcons"
                  name="facebook"
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      )}
    </Content>
  );
};

export default SignIn;
