import React, { useEffect, useState, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useIsFocused } from '@react-navigation/native';
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

// import useInAppPurchase from '@Lib/useInAppPurchase';
import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { UserHeader, LogoSpinner } from '@Components';
import { ToastMessage } from '@Lib/function';
import { timeStamptoDate, timeStamptoDateTime } from '@Lib/utilities';

import { UserType } from './types';
import styles from './styles';
// import { Routes } from '@Navigators/routes';

const MyAccount: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const isFocused = useIsFocused();
  const { user, setDisplayName } = useContext(AuthContext) as AuthContextType;
  // const { currentProductId, expiresDate, purchaseDate, validate } =
  //   useInAppPurchase();

  const [userInfo, setUserInfo] = useState<UserType>();
  const [initUserInfo, setInitUserInfo] = useState<UserType>();
  const [newPassView, setNewPassView] = useState(true);
  const [newRePassView, setNewRePassView] = useState(true);
  const [loading, setLoading] = useState(true);
  const [passChangeDisabled, setPassChangeDisabled] = useState(false);

  const saveUserData = () => {
    const userData: UserType = {};

    if (userInfo?.firstName === '') {
      ToastMessage('Please input your first name.', 'danger', 'bottom');
      return;
    }
    if (userInfo?.lastName === '') {
      ToastMessage('Please input your last name.', 'danger', 'bottom');
      return;
    }
    userData.firstName = userInfo?.firstName;
    userData.lastName = userInfo?.lastName;

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (userInfo?.email && reg.test(userInfo?.email) === false) {
      ToastMessage('Email is incorrect', 'danger', 'bottom');
      return;
    } else {
      userData.email = userInfo?.email;
    }
    if (
      userInfo?.password !== '' &&
      userInfo?.password !== userInfo?.repassword
    ) {
      ToastMessage("Passwords don't match.", 'danger', 'bottom');
      return;
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
          ToastMessage(
            'Your email address was successfully changed.',
            'success',
            'bottom'
          );
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
          ToastMessage(
            'Your password was successfully changed.',
            'success',
            'bottom'
          );
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
    ToastMessage(
      'Your changes have been successfully saved.',
      'success',
      'bottom'
    );
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
    if (isFocused) {
      getUserData();
    }
  }, [navigation]);

  // useEffect(() => {
  //   (async function () {
  //     await validate();
  //   })();
  // }, []);

  // useEffect(() => {
  //   if (purchaseDate && expiresDate) {
  //     const userData = {
  //       subscription: {
  //         purchaseDate,
  //         expiresDate,
  //         productItem: currentProductId
  //       }
  //     };
  //     const docRef = firestore().collection('users').doc(user.uid);
  //     docRef.get().then(thisDoc => {
  //       if (thisDoc.exists) {
  //         docRef.update(userData).then(() => {
  //           getUserData();
  //         });
  //       }
  //     });
  //   }
  // }, [purchaseDate, expiresDate]);

  useEffect(() => {
    setDisplayName(initUserInfo?.firstName + ' ' + initUserInfo?.lastName);
  }, [initUserInfo]);

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
                {initUserInfo?.firstName + ' ' + initUserInfo?.lastName}
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
            </View>
            <View style={styles.basicView}>
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
            </View>
            {!passChangeDisabled && (
              <View style={styles.basicView}>
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
                  />
                  <TouchableOpacity
                    onPress={() => setNewPassView(!newPassView)}>
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
                  />
                  <TouchableOpacity
                    onPress={() => setNewRePassView(!newRePassView)}>
                    <Icon
                      type="FontAwesome5"
                      name={newRePassView ? 'eye' : 'eye-slash'}
                      style={styles.eyeIcon}
                    />
                  </TouchableOpacity>
                </Item>
              </View>
            )}
            {/* <View style={styles.basicView}>
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
                {purchaseDate && (
                  <Text style={styles.subscriptionText}>
                    {timeStamptoDateTime(purchaseDate)}
                  </Text>
                )}
              </View>
              <View style={styles.subscriptionView}>
                <Text style={styles.subscriptionText}>Renewal Date</Text>
                {expiresDate && (
                  <Text style={styles.subscriptionText}>
                    {timeStamptoDateTime(expiresDate)}
                  </Text>
                )}
              </View>
            </View> */}
            {JSON.stringify(initUserInfo) !== JSON.stringify(userInfo) && (
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
