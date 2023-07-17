import React, { useEffect, useContext, useState } from 'react';
import {
  TouchableOpacity,
  Image,
  Platform,
  ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { Container, Content, Icon, Text, View, Button } from 'native-base';
import { SvgXml } from 'react-native-svg';

import { LogoSpinner, Button as CustomButton, TermsPrivacy } from '@Components';
import { ToastMessage } from '@Lib/function';
import { WEB_CLIENT_ID } from '@env';
import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { Routes } from '@Navigators/routes';
import { Images, Svgs } from '@Theme';

import styles, { scale } from './styles';

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  offlineAccess: false
});

const Register: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const { user, setUser, setDisplayName } = useContext(
    AuthContext
  ) as AuthContextType;
  const [loading, setLoading] = useState(false);

  const onGoogleResiger = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = await auth.GoogleAuthProvider.credential(
        idToken
      );
      const result = await auth().signInWithCredential(googleCredential);

      if (result?.additionalUserInfo?.isNewUser) {
        const userData = {
          uid: result.user.uid,
          email: result?.additionalUserInfo?.profile?.email,
          firstName: result?.additionalUserInfo?.profile?.given_name || '',
          lastName: result?.additionalUserInfo?.profile?.family_name || '',
          registerType: 'google',
          registerDate: Date.now()
        };
        const docRef = await firestore()
          .collection('users')
          .doc(result.user.uid);
        docRef.get().then(thisDoc => {
          if (!thisDoc.exists) {
            docRef.set(userData);
          }
        });
        setDisplayName(userData.firstName + ' ' + userData.lastName);
        setLoading(false);
      } else {
        setLoading(false);
        ToastMessage('The email address already exists.', 'warning', 'bottom');
      }
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

  const onAppleRegister = async () => {
    if (appleAuth.isSupported) {
      try {
        setLoading(true);

        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
        });

        const { identityToken, nonce, fullName } = appleAuthRequestResponse;

        const appleCredential = auth.AppleAuthProvider.credential(
          identityToken,
          nonce
        );

        const result = await auth().signInWithCredential(appleCredential);

        setDisplayName(
          (fullName?.givenName || '') + ' ' + (fullName?.familyName || '')
        );

        if (result?.additionalUserInfo?.isNewUser) {
          const userData = {
            uid: result.user.uid,
            email: result?.additionalUserInfo?.profile?.email,
            firstName: fullName?.givenName || '',
            lastName: fullName?.familyName || '',
            registerType: 'apple',
            registerDate: Date.now()
          };

          const docRef = firestore().collection('users').doc(result.user.uid);
          docRef.get().then(thisDoc => {
            if (!thisDoc.exists) {
              docRef.set(userData);
            }
          });
          setLoading(false);
        } else {
          ToastMessage(
            'The email address already exists.',
            'warning',
            'bottom'
          );
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
      }
    } else {
      ToastMessage(
        'AppleAuth is not supported on this device. Currently Apple Authentication works on iOS devices running iOS 13 or later.',
        'warning',
        'bottom'
      );
    }
  };

  const onAuthStateChanged = (authUser: any) => {
    setUser(authUser);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  useEffect(() => {
    if (user) {
      navigation.navigate(Routes.DrawerRoute);
    }
  }, [user]);

  return (
    <Container style={styles.background}>
      <ImageBackground
        source={Images.background}
        resizeMode="stretch"
        style={styles.backgroundImage}>
        <Content
          contentContainerStyle={styles.contentView}
          scrollEnabled={false}>
          {loading ? (
            <LogoSpinner />
          ) : (
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => navigation.navigate(Routes.Splash)}>
                <Image source={Images.closeIcon} style={styles.closeIcon} />
              </TouchableOpacity>
              <View style={styles.mainView}>
                <View>
                  <CustomButton
                    text="Sign up with email"
                    onPress={() => navigation.navigate(Routes.EmailRegister)}
                  />
                  <Text style={styles.signTitle}>
                    Or sign up using your Google or Apple account
                  </Text>
                  <View style={styles.socialBtns}>
                    {Platform.OS === 'ios' && (
                      <Button
                        full
                        rounded
                        light
                        style={styles.loginFormNeedBtn}
                        onPress={onAppleRegister}>
                        <SvgXml
                          xml={Svgs.appleIcon}
                          width={35 * scale}
                          height={35 * scale}
                        />
                      </Button>
                    )}
                    <Button
                      full
                      rounded
                      light
                      style={styles.loginFormNeedBtn}
                      onPress={onGoogleResiger}>
                      <SvgXml
                        xml={Svgs.googleIcon}
                        width={35 * scale}
                        height={35 * scale}
                      />
                    </Button>
                  </View>
                  <TermsPrivacy />
                </View>
                {/* <View style={styles.footerText}>
                  <Text style={[styles.blackLabel, styles.italicLabel]}>
                    This product is for information and entertainment purposes
                    only.
                  </Text>
                </View> */}
              </View>
            </View>
          )}
        </Content>
      </ImageBackground>
    </Container>
  );
};

export default Register;
