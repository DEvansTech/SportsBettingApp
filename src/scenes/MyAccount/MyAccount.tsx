import React, { useEffect, useState, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Container,
  Content,
  Text,
  View,
  Icon,
  Button,
  Input,
  Item
} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import RNPickerSelect from 'react-native-picker-select';
import { TextInputMask } from 'react-native-masked-text';

import useInAppPurchase from '@Lib/useInAppPurchase';
import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { UserHeader, LogoSpinner } from '@Components';
import { ToastMessage } from '@Lib/function';
import { timeStamptoDate, timeStamptoDateTime } from '@Lib/utilities';
import { Colors } from '@Theme';

import { UserType } from './types';
import styles, { pickerSelectStyles } from './styles';
import { Routes } from '@Navigators/routes';

const MyAccount: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const genders = [
    {
      label: 'Male',
      value: 'male'
    },
    {
      label: 'Female',
      value: 'female'
    }
  ];

  const { user } = useContext(AuthContext) as AuthContextType;
  const { currentProductId, expiresDate, purchaseDate, validate } =
    useInAppPurchase();

  const [userInfo, setUserInfo] = useState<UserType>();
  const [initUserInfo, setInitUserInfo] = useState<UserType>();
  const [newPassView, setNewPassView] = useState(true);
  const [newRePassView, setNewRePassView] = useState(true);
  const [loading, setLoading] = useState(true);
  const [passChangeDisabled, setPassChangeDisabled] = useState(false);

  const saveUserData = () => {
    const userData: UserType = {};

    if (userInfo?.firstName === '' || userInfo?.lastName === '') {
      ToastMessage('Please input User Name', 'danger', 'bottom');
      return;
    } else {
      userData.firstName = userInfo?.firstName;
      userData.lastName = userInfo?.lastName;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (userInfo?.email && reg.test(userInfo?.email) === false) {
      ToastMessage('Email is Not Correct', 'danger', 'bottom');
      return;
    } else {
      userData.email = userInfo?.email;
    }
    if (userInfo?.phoneNumber) {
      userData.phoneNumber = userInfo?.phoneNumber;
    }
    if (
      userInfo?.password !== '' &&
      userInfo?.password !== userInfo?.repassword
    ) {
      ToastMessage("Password doesn't match", 'danger', 'bottom');
      return;
    }

    if (userInfo?.gender && userInfo?.gender !== '') {
      userData.gender = userInfo?.gender;
    }
    if (userInfo?.birthday && userInfo?.birthday !== '') {
      userData.birthday = userInfo?.birthday;
    }
    const docRef = firestore().collection('users').doc(user.uid);
    docRef.get().then(thisDoc => {
      if (thisDoc.exists) {
        docRef.update(userData).then(() => {
          getUserData();
        });
      }
    });

    if (userInfo?.email && userInfo?.email !== user.email) {
      auth()
        .currentUser?.updateEmail(userInfo.email)
        .then(() => {
          ToastMessage('Email was changed', 'success', 'bottom');
          setTimeout(() => {
            getUserData();
          }, 1000);
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/requires-recent-login':
              ToastMessage(
                'This operation is sensitive and requires recent authentication. Log in again before retrying this request.',
                'danger',
                'bottom'
              );
              break;
          }
        });
    }

    if (userInfo?.password && userInfo?.password !== '') {
      auth()
        .currentUser?.updatePassword(userInfo.password)
        .then(() => {
          ToastMessage('Password was changed', 'success', 'bottom');
          setTimeout(() => {
            getUserData();
          }, 1000);
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/requires-recent-login':
              ToastMessage(
                'This operation is sensitive and requires recent authentication. Log in again before retrying this request.',
                'danger',
                'bottom'
              );
              break;
          }
        });
    }
    ToastMessage('Your Changed have been succssfully saved!', 'success', 'top');
  };

  const getUserData = () => {
    if (user) {
      firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((doc: any) => {
          setUserInfo(doc.data());
          setInitUserInfo(doc.data());
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    setPassChangeDisabled(userInfo?.registerType !== 'email');
  }, [userInfo]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserData();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    (async function () {
      await validate();
    })();
  }, []);

  useEffect(() => {
    if (purchaseDate !== '' && expiresDate !== '') {
      const userData = {
        subscription: {
          purchaseDate,
          expiresDate,
          productItem: currentProductId
        }
      };
      const docRef = firestore().collection('users').doc(user.uid);
      docRef.get().then(thisDoc => {
        if (thisDoc.exists) {
          docRef.update(userData).then(() => {
            getUserData();
          });
        }
      });
    }
  }, [purchaseDate, expiresDate]);

  return (
    <Container style={styles.background}>
      <UserHeader
        type="icon"
        iconType="MaterialCommunityIcons"
        iconName="account-cog-outline"
        name="My Account"
      />
      <Content contentContainerStyle={styles.contentView}>
        {loading ? (
          <LogoSpinner />
        ) : (
          <View style={styles.container}>
            <View style={styles.mainView}>
              <Text style={styles.userName}>
                {userInfo?.firstName + ' ' + userInfo?.lastName}
              </Text>
              <Text style={styles.signInDate}>
                ODDS-R user since{' '}
                {timeStamptoDate(user?.metadata?.creationTime)}
              </Text>
            </View>
            <View style={styles.basicView}>
              <Text style={styles.basicTitle}>Basic Profile</Text>
              <View style={styles.nameView}>
                <Icon
                  type="FontAwesome"
                  name="user-o"
                  style={styles.itemIcon}
                />
                <Input
                  value={userInfo?.firstName}
                  placeholder="First Name"
                  style={styles.inputView}
                  onChangeText={text =>
                    setUserInfo({ ...userInfo, firstName: text })
                  }
                />
                <Input
                  value={userInfo?.lastName}
                  placeholder="Last Name"
                  style={styles.inputView}
                  onChangeText={text =>
                    setUserInfo({ ...userInfo, lastName: text })
                  }
                />
              </View>
              <Item style={styles.itemView1}>
                <Icon
                  type="FontAwesome"
                  name="intersex"
                  style={styles.itemIcon}
                />
                <RNPickerSelect
                  items={genders}
                  onValueChange={item => {
                    setUserInfo({ ...userInfo, gender: item });
                  }}
                  value={userInfo?.gender}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => (
                    <Icon
                      name="chevron-down"
                      style={styles.selectIcon}
                      color={Colors.black}
                    />
                  )}
                  style={pickerSelectStyles}
                  placeholder={{
                    label: 'Select a Gender...',
                    value: null
                  }}
                />
              </Item>
            </View>
            <View style={styles.basicView}>
              <Text style={styles.basicTitle}>Private Information</Text>
              <Item style={styles.itemView}>
                <Icon
                  type="FontAwesome"
                  name="envelope-o"
                  style={styles.itemIcon}
                />
                <Input
                  value={userInfo?.email}
                  placeholder="Email Address"
                  style={styles.inputView}
                  onChangeText={text =>
                    setUserInfo({ ...userInfo, email: text })
                  }
                />
              </Item>
              <Item style={styles.itemView}>
                <Icon
                  type="MaterialIcons"
                  name="phone-android"
                  style={styles.itemIcon}
                />
                <TextInputMask
                  type={'custom'}
                  options={{
                    mask: '(999) 999-9999'
                  }}
                  value={userInfo?.phoneNumber}
                  onChangeText={text =>
                    setUserInfo({ ...userInfo, phoneNumber: text })
                  }
                  style={styles.phoneInputView}
                  placeholder="Phone Number"
                />
              </Item>
              <Item style={styles.itemView}>
                <Icon
                  type="FontAwesome"
                  name="birthday-cake"
                  style={styles.itemIcon}
                />
                <TextInputMask
                  type={'datetime'}
                  options={{
                    format: 'MM/DD/YYYY'
                  }}
                  value={userInfo?.birthday}
                  onChangeText={text =>
                    setUserInfo({ ...userInfo, birthday: text })
                  }
                  style={styles.phoneInputView}
                  placeholder="Birthday (MM/DD/YYYY)"
                />
              </Item>
            </View>
            <View
              style={[
                styles.basicView,
                passChangeDisabled && styles.disabledView
              ]}>
              <Text style={styles.basicTitle}>Change Password</Text>
              <Item style={styles.itemView}>
                <Icon type="Feather" name="unlock" style={styles.itemIcon} />
                <Input
                  value={userInfo?.password}
                  placeholder="Enter New Password"
                  style={styles.inputView}
                  secureTextEntry={newPassView}
                  onChangeText={text =>
                    setUserInfo({ ...userInfo, password: text })
                  }
                  disabled={passChangeDisabled}
                />
                <TouchableOpacity
                  onPress={() => setNewPassView(!newPassView)}
                  disabled={passChangeDisabled}>
                  <Icon
                    type="FontAwesome5"
                    name={newPassView ? 'eye' : 'eye-slash'}
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </Item>
              <Item style={styles.itemView}>
                <Icon type="Feather" name="unlock" style={styles.itemIcon} />
                <Input
                  value={userInfo?.repassword}
                  placeholder="Retype New Password"
                  style={styles.inputView}
                  secureTextEntry={newRePassView}
                  onChangeText={text =>
                    setUserInfo({ ...userInfo, repassword: text })
                  }
                  disabled={passChangeDisabled}
                />
                <TouchableOpacity
                  onPress={() => setNewRePassView(!newRePassView)}
                  disabled={passChangeDisabled}>
                  <Icon
                    type="FontAwesome5"
                    name={newRePassView ? 'eye' : 'eye-slash'}
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </Item>
            </View>
            <View style={styles.basicView}>
              <Text style={styles.basicTitle}>Subscription</Text>
              <View style={styles.subscriptionView}>
                <Text style={styles.subscriptionText}>
                  {currentProductId === 'oddsr_5999_1y' ? 'Annual' : 'Monthly'}
                </Text>
                <Button
                  bordered
                  success
                  small
                  rounded
                  onPress={() =>
                    navigation.navigate(Routes.Subscription, { state: true })
                  }>
                  <Text>Change</Text>
                </Button>
              </View>
              <View style={styles.subscriptionView}>
                <Text style={styles.subscriptionText}>Purchased Date</Text>
                {purchaseDate !== '' && (
                  <Text style={styles.subscriptionText}>
                    {timeStamptoDateTime(purchaseDate)}
                  </Text>
                )}
              </View>
              <View style={styles.subscriptionView}>
                <Text style={styles.subscriptionText}>Renewal Date</Text>
                {expiresDate !== '' && (
                  <Text style={styles.subscriptionText}>
                    {timeStamptoDateTime(expiresDate)}
                  </Text>
                )}
              </View>
            </View>
            {initUserInfo !== userInfo && (
              <Button success onPress={saveUserData} style={styles.saveButton}>
                <Text style={styles.buttonText}>Save</Text>
              </Button>
            )}
          </View>
        )}
      </Content>
    </Container>
  );
};

export default MyAccount;
