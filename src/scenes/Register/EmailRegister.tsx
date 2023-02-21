import React, { useState, useContext, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { ImageBackground, TouchableOpacity, Image } from 'react-native';
import {
  Container,
  Content,
  Button,
  Icon,
  Text,
  View,
  Item,
  Input
} from 'native-base';
import { SvgXml } from 'react-native-svg';

import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { Button as CustomButton } from '@Components';
import { ToastMessage, existUser } from '@Lib/function';
import { Routes } from '@Navigators/routes';
import { Images, Svgs } from '@Theme';

import styles, { scale } from './styles';

const EmailRegister: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const { emailRegister, user, setUser, setDisplayName } = useContext(
    AuthContext
  ) as AuthContextType;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const onAuthStateChanged = (authUser: any) => {
    setUser(authUser);
  };

  const register = async () => {
    if (firstName === '') {
      ToastMessage('Please input First Name', 'warning', 'bottom');
      return;
    }
    if (lastName === '') {
      ToastMessage('Please input Last Name', 'warning', 'bottom');
      return;
    }
    if (email === '') {
      ToastMessage('Please input Email Address', 'warning', 'bottom');
      return;
    }
    if (password === '') {
      ToastMessage('Please input Password', 'warning', 'bottom');
      return;
    }

    const check = await existUser(email);

    if (check) {
      ToastMessage('The email address already exists.', 'warning', 'bottom');
      return;
    }

    emailRegister(email, password, firstName, lastName);
    setDisplayName(firstName + ' ' + lastName);
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
    <Container style={styles.background}>
      <ImageBackground
        source={Images.background1}
        resizeMode="stretch"
        style={styles.backgroundImage}>
        <Content contentContainerStyle={styles.contentView}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => navigation.navigate(Routes.Splash)}>
              <Image source={Images.closeIcon} style={styles.closeIcon} />
            </TouchableOpacity>
            <View style={styles.emailForm}>
              <Text style={styles.emailFormTitle}>Create an account</Text>
              <Item style={styles.emailItem}>
                <SvgXml
                  xml={Svgs.userIcon}
                  width={34 * scale}
                  height={34 * scale}
                />
                <Input
                  placeholder="First name"
                  placeholderTextColor="white"
                  value={firstName}
                  onChangeText={fname => setFirstname(fname)}
                  style={styles.input}
                />
              </Item>
              <Item style={styles.emailItem}>
                <SvgXml
                  xml={Svgs.userIcon}
                  width={34 * scale}
                  height={34 * scale}
                />
                <Input
                  placeholder="Last name"
                  placeholderTextColor="white"
                  value={lastName}
                  onChangeText={lname => setLastname(lname)}
                  style={styles.input}
                />
              </Item>
              <Item style={styles.emailItem}>
                <SvgXml
                  xml={Svgs.emailIcon}
                  width={34 * scale}
                  height={34 * scale}
                />
                <Input
                  placeholder="Email address"
                  placeholderTextColor="white"
                  value={email}
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  onChangeText={useremail => setEmail(useremail)}
                  style={styles.input}
                />
              </Item>
              <Item style={styles.emailItem}>
                <SvgXml
                  xml={Svgs.passwordIcon}
                  width={38 * scale}
                  height={38 * scale}
                />
                <Input
                  placeholder="Password"
                  placeholderTextColor="white"
                  value={password}
                  textContentType="password"
                  secureTextEntry={showPassword}
                  autoCapitalize="none"
                  onChangeText={pwd => setPassword(pwd)}
                  style={styles.input}
                  returnKeyType="go"
                  onSubmitEditing={register}
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
            <View style={styles.emailFormBtn}>
              <CustomButton text="Sign Up" onPress={register} />
              <Button
                full
                rounded
                light
                style={styles.emailHaveBtn}
                onPress={() => navigation.navigate(Routes.Login)}>
                <Text style={styles.buttonBlackText}>
                  Already have an Account?
                </Text>
              </Button>
            </View>
            <View style={styles.textFooter}>
              <Text style={styles.blackLabel}>
                By continuing, you agree with the Terms of Service and Privacy
                Policy
              </Text>
            </View>
          </View>
        </Content>
      </ImageBackground>
    </Container>
  );
};

export default EmailRegister;
