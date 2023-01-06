import React, { useState, useContext, useEffect } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import firestore from '@react-native-firebase/firestore';
import { ImageBackground, TouchableOpacity, Image } from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  View,
  Item,
  Input,
  Icon
} from 'native-base';
import { SvgXml } from 'react-native-svg';

import { LogoSpinner, Button as CustomButton } from '@Components';
import { ToastMessage, existUser } from '@Lib/function';
import useInAppPurchase from '@Lib/useInAppPurchase';
import { Routes } from '@Navigators/routes';
import { WEB_CLIENT_ID } from '@env';
import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { Images, Svgs } from '@Theme';

import styles, { scale } from './styles';

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  offlineAccess: false
});

const Login: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const { emailLogin, user, setUser, setDisplayName } = useContext(
    AuthContext
  ) as AuthContextType;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const onGoogleLogin = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const currentUser = await GoogleSignin.getCurrentUser();
      const check = await existUser(currentUser?.user?.email);

      if (!check) {
        setLoading(false);
        ToastMessage(
          "The email address doesn't exists. Please create an account",
          'warning',
          'bottom'
        );
        return;
      }

      const googleCredential = await auth.GoogleAuthProvider.credential(
        idToken
      );
      await auth().signInWithCredential(googleCredential);
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

  const onAppleLogin = async () => {
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
      if (result?.additionalUserInfo?.isNewUser) {
        const userData = {
          uid: result.user.uid,
          email: result?.additionalUserInfo?.profile?.email,
          firstName: fullName?.givenName,
          lastName: fullName?.familyName,
          registerType: 'apple'
        };

        const docRef = firestore().collection('users').doc(result.user.uid);

        docRef.get().then(thisDoc => {
          if (!thisDoc.exists) {
            docRef.set(userData);
          }
        });
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const onAuthStateChanged = (authUser: any) => {
    setUser(authUser);
  };

  const login = () => {
    if (email === '') {
      ToastMessage('Please input Email Address', 'warning', 'bottom');
      return;
    }
    if (password === '') {
      ToastMessage('Please input Password', 'warning', 'bottom');
      return;
    }
    emailLogin(email, password);
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

  useEffect(() => {
    if (user) {
      getUserName();
      navigation.navigate(Routes.DrawerNav);
    }
  }, [user]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <Container style={styles.background}>
      <ImageBackground
        source={Images.background1}
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
              <View style={styles.loginForm}>
                <Text style={styles.loginFormTitle}>Sign in</Text>
                <Item style={styles.loginItem}>
                  <SvgXml
                    xml={Svgs.emailIcon}
                    width={35 * scale}
                    height={35 * scale}
                  />
                  <Input
                    placeholder="Email Address"
                    placeholderTextColor="white"
                    autoCapitalize="none"
                    value={email}
                    autoCompleteType="email"
                    style={styles.input}
                    onChangeText={userEmail => setEmail(userEmail)}
                  />
                </Item>
                <Item style={styles.loginItem}>
                  <SvgXml
                    xml={Svgs.passwordIcon}
                    width={38 * scale}
                    height={38 * scale}
                  />
                  <Input
                    placeholder="Password"
                    placeholderTextColor="white"
                    autoCapitalize="none"
                    value={password}
                    autoCompleteType="password"
                    secureTextEntry={showPassword}
                    style={styles.input}
                    returnKeyType="go"
                    onChangeText={userPass => setPassword(userPass)}
                    onSubmitEditing={login}
                  />
                  <TouchableOpacity
                    style={styles.eyeIconView}
                    onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                      type="FontAwesome5"
                      name={showPassword ? 'eye' : 'eye-slash'}
                      style={styles.eyeIcon}
                    />
                  </TouchableOpacity>
                </Item>
              </View>
              <View style={styles.loginFormBtns}>
                <CustomButton text="Sign in" onPress={login} />
                <Button
                  full
                  rounded
                  light
                  style={styles.loginFormNeedBtn}
                  onPress={() => navigation.navigate(Routes.Register)}>
                  <Text style={styles.buttonBlackText}>Need an Account?</Text>
                </Button>
                <Text style={styles.helpText}>Need help signing in?</Text>
              </View>
              <View style={styles.socialBtns}>
                <TouchableOpacity onPress={onGoogleLogin}>
                  <SvgXml
                    xml={Svgs.googleIcon}
                    width={38 * scale}
                    height={38 * scale}
                  />
                </TouchableOpacity>
                {Platform.OS === 'ios' && (
                  <TouchableOpacity onPress={onAppleLogin}>
                    <SvgXml
                      xml={Svgs.appleIcon}
                      width={38 * scale}
                      height={38 * scale}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity>
                  <SvgXml
                    xml={Svgs.facebookIcon}
                    width={38 * scale}
                    height={38 * scale}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Content>
      </ImageBackground>
    </Container>
  );
};

export default Login;
