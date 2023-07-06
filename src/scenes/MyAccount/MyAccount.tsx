import React, { useEffect, useState, useContext } from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import {
  Container,
  Content,
  Header,
  Text,
  View,
  Icon,
  Button,
  Input,
  Item
} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { SvgXml } from 'react-native-svg';
import Purchases from 'react-native-purchases';

import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { LogoSpinner, ModalCancelAccount } from '@Components';
import { ToastMessage } from '@Lib/function';
import { timeStamptoDate, timeStamptoDateTime } from '@Lib/utilities';
import { ENTITLEMENT_ID } from '@Lib/constants';

import { Svgs, Colors } from '@Theme';
import { UserType } from './types';
import styles, { scale } from './styles';
import { Routes } from '@Navigators/routes';
// import { Routes } from '@Navigators/routes';

const MyAccount: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const isFocused = useIsFocused();
  const { user, setDisplayName } = useContext(AuthContext) as AuthContextType;

  const [userInfo, setUserInfo] = useState<UserType>();
  const [initUserInfo, setInitUserInfo] = useState<UserType>();
  const [newPassView, setNewPassView] = useState(true);
  const [newRePassView, setNewRePassView] = useState(true);
  const [loading, setLoading] = useState(true);
  const [passChangeDisabled, setPassChangeDisabled] = useState(false);
  const [isCancelAccountModal, setIsCancelAccountModal] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<any>(undefined);

  const cancelAccount = () => {
    setIsCancelAccountModal(!isCancelAccountModal);
  };

  const deleteAccount = () => {
    Linking.openURL('https://odds-r.pro/contacts.html');
  };

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

  useEffect(() => {
    if (isFocused) {
      (async function () {
        const customerInfo = await Purchases.getCustomerInfo();
        setSubscriptionData(customerInfo.entitlements.active[ENTITLEMENT_ID]);
      })();
    }
  }, [isFocused]);

  const gotoBack = () => {
    navigation.navigate(Routes.TabRoute);
    navigation.dispatch(DrawerActions.openDrawer());
  };

  useEffect(() => {
    setDisplayName(initUserInfo?.firstName + ' ' + initUserInfo?.lastName);
  }, [initUserInfo]);

  return (
    <Container style={styles.background}>
      <Header
        style={styles.header}
        iosBarStyle={'light-content'}
        androidStatusBarColor={Colors.black}>
        <TouchableOpacity onPress={gotoBack} style={styles.headerLeft}>
          <Icon
            type="SimpleLineIcons"
            name="arrow-left"
            style={styles.backIcon}
          />
          <Text style={styles.headerText}>My info</Text>
        </TouchableOpacity>
        <SvgXml xml={Svgs.userIcon} width={38 * scale} height={38 * scale} />
      </Header>

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
                OddsR™ user since{' '}
                {timeStamptoDate(user?.metadata?.creationTime)}
              </Text>
            </View>
            <View style={styles.basicView}>
              <Text style={styles.basicTitle}>Basic Profile</Text>
              <Item style={styles.itemView}>
                <SvgXml
                  xml={Svgs.maccountIcon}
                  width={25 * scale}
                  height={25 * scale}
                />
                <Input
                  value={userInfo?.firstName}
                  placeholder="First Name"
                  style={styles.inputView}
                  onChangeText={text =>
                    setUserInfo({ ...userInfo, firstName: text })
                  }
                />
              </Item>
              <Item style={styles.itemView}>
                <SvgXml
                  xml={Svgs.maccountIcon}
                  width={25 * scale}
                  height={25 * scale}
                />
                <Input
                  value={userInfo?.lastName}
                  placeholder="Last Name"
                  style={styles.inputView}
                  onChangeText={text =>
                    setUserInfo({ ...userInfo, lastName: text })
                  }
                />
              </Item>
            </View>
            <Item style={styles.itemView}>
              <SvgXml
                xml={Svgs.memailIcon}
                width={25 * scale}
                height={25 * scale}
              />
              <Input
                value={userInfo?.email}
                placeholder="Email Address"
                style={styles.inputView}
                onChangeText={text => setUserInfo({ ...userInfo, email: text })}
              />
            </Item>
            {!passChangeDisabled && (
              <View style={styles.basicView}>
                <Text style={styles.basicTitle}>Change Password</Text>
                <Item style={styles.itemView}>
                  <SvgXml
                    xml={Svgs.mpasswordIcon}
                    width={25 * scale}
                    height={25 * scale}
                  />
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
                  <SvgXml
                    xml={Svgs.mpasswordIcon}
                    width={25 * scale}
                    height={25 * scale}
                  />
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
            {subscriptionData && (
              <View style={styles.basicView}>
                <Text style={styles.basicTitle}>Subscription</Text>
                <View style={styles.subscriptionView}>
                  <Text style={styles.subscriptionText}>
                    {subscriptionData.productIdentifier === 'oddsr_999_1m_14d0'
                      ? 'Monthly'
                      : 'Annual'}
                  </Text>
                  {/* <Button
                    bordered
                    success
                    small
                    rounded
                    onPress={() =>
                      navigation.navigate(Routes.Subscription, {
                        selectedItem: subscriptionData.productIdentifier
                      })
                    }>
                    <Text>Change</Text>
                  </Button> */}
                </View>
                <View style={styles.subscriptionView}>
                  <Text style={styles.subscriptionText}>Purchased Date</Text>
                  <Text style={styles.subscriptionText}>
                    {timeStamptoDateTime(
                      subscriptionData.latestPurchaseDateMillis
                    )}
                  </Text>
                </View>
                <View style={styles.subscriptionView}>
                  <Text style={styles.subscriptionText}>Renewal Date</Text>
                  <Text style={styles.subscriptionText}>
                    {timeStamptoDateTime(subscriptionData.expirationDateMillis)}
                  </Text>
                </View>
              </View>
            )}
            <View style={styles.cancelAccountItem}>
              <Button transparent iconLeft icon onPress={cancelAccount}>
                <SvgXml
                  xml={Svgs.mcancelIcon}
                  width={23 * scale}
                  height={23 * scale}
                />
                <Text style={styles.cancelAccountText}>
                  Cancel subscription
                </Text>
              </Button>
            </View>
            <View style={styles.cancelAccountItem}>
              <Button transparent iconLeft icon onPress={deleteAccount}>
                <SvgXml
                  xml={Svgs.mcancelIcon}
                  width={23 * scale}
                  height={23 * scale}
                />
                <Text style={styles.cancelAccountText}>Delete account</Text>
              </Button>
            </View>

            {JSON.stringify(initUserInfo) !== JSON.stringify(userInfo) && (
              <Button
                success
                full
                rounded
                onPress={saveUserData}
                style={styles.saveButton}>
                <Text style={styles.buttonText}>Save</Text>
              </Button>
            )}
          </View>
        )}
      </Content>
      <ModalCancelAccount
        isModalVisible={isCancelAccountModal}
        toggleModal={cancelAccount}
      />
    </Container>
  );
};

export default MyAccount;
